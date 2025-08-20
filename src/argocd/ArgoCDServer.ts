import {chmodSync} from 'fs';
import * as core from '@actions/core';
import {downloadTool} from '@actions/tool-cache';

import {type App} from './App.js';
import {AppCollection} from './AppCollection.js';
import {type AppTargetRevision} from './AppTargetRevision.js';
import {type Diff} from '../Diff.js';
import {type ExecResult, execCommand, scrubSecrets} from '../lib.js';
import {ActionInput} from '../getActionInput.js';
import {URL} from "node:url";

export class ArgoCDServer {
    binaryPath = 'bin/argo';
    extraCommandArgs: string;
    fqdn: string;
    headers: Map<string, string>;
    protocol: string;
    token: string;
    uri: string;

    constructor(actionInput: ActionInput) {
        this.extraCommandArgs = actionInput.argocd.extraCliArgs;
        this.fqdn = actionInput.argocd.fqdn;
        this.headers = actionInput.argocd.headers;
        this.protocol = actionInput.argocd.protocol;
        this.token = actionInput.argocd.token;
        this.uri = actionInput.argocd.uri;
    }

    async installArgoCDCommand(version: string, arch = 'linux'): Promise<void> {
        if (version == '') {
            version = await this.getServerVersion();
        }

        await downloadTool(
            `https://github.com/argoproj/argo-cd/releases/download/${version}/argocd-${arch}-amd64`,
            this.binaryPath,
        );
        chmodSync(this.binaryPath, '755');
    }

    async command(params: string): Promise<ExecResult> {
        let cmd = `${this.binaryPath} ${params} --auth-token=${this.token} --server=${this.fqdn}`;

        if (this.extraCommandArgs) {
            cmd += ` ${this.extraCommandArgs}`;
        }

        for (const [header, value] of this.headers.entries()) {
            cmd += ` --header "${header}: ${value}"`;
        }

        core.debug(`Running: ${scrubSecrets(cmd, this.headers)}`);
        return execCommand(cmd);
    }

    async getAppLocalDiff(app: App): Promise<Diff> {
        if (app.spec.source?.path === undefined) {
            core.error(`Cannot diff ${app.metadata.name}, no source.path`);

            return {app, diff: ''} as Diff;
        }

        return this.getAppDiff(app, [`--local=${app.spec.source.path}`]);
    }

    async getAppRevisionDiff(app: App, targetRevision: string): Promise<Diff> {
        return this.getAppDiff(app, [`--revision=${targetRevision}`]);
    }

    async getAppDiff(app: App, params: string[] = []): Promise<Diff> {
        let res: ExecResult;
        try {
            res = await this.command(
                `app diff --local-repo-root=${process.cwd()} ${app.metadata.name} ${params.join(' ')} --exit-code=false`,
            );
            core.debug(`stdout: ${res.stdout}`);
            core.debug(`stderr: ${res.stderr}`);
            return {app, diff: res.stdout} as Diff;
        } catch (e) {
            res = e as ExecResult;
            core.error('Unexpected error when fetching app diff:');
            core.error(`${res.err}`);
            return {app, diff: '', error: res} as Diff;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async api(endpoint: string, params: { [key: string]: string } = {}, method = 'GET'): Promise<any> {
        const url = new URL(`${this.uri}/api/${endpoint}`);

        for (let paramsKey in params) {
            if (params[paramsKey]) {
                url.searchParams.append(paramsKey, params[paramsKey]);
            }
        }

        core.debug(`Making API call to: '${url}'`);

        // response.json() returns `any`.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let responseText: any;
        let responseJson: any;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    Cookie: `argocd.token=${this.token}`,
                    ...Object.fromEntries(this.headers),
                },
            });
            core.debug(`API call response code: ${response.status}`);

            responseText = await response.text();

            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}.`);
            }

            responseJson = JSON.parse(responseText);
        } catch (err) {
            if (err instanceof Error) {
                core.error(`Failed to fetch ${endpoint} from ${this.uri}.`);
                core.error(`Response Text: ${responseText}`);
                core.error(err.message);
            }
            throw err;
        }

        if (responseJson.error) {
            core.error('Error returned by API');
            core.error(responseJson);
            throw new Error(`Error returned by ArgoCD API: ${JSON.stringify(responseJson)}`);
        }

        return responseJson;
    }

    async getAppCollection(): Promise<AppCollection> {
        const responseJson = await this.api('v1/applications');
        return new AppCollection(responseJson.items);
    }

    async getServerVersion(): Promise<string> {
        const responseJson = await this.api('version');
        // Return the release tag without the build metadata (e.g., v2.4.0+91aefab -> v2.4.0).
        return responseJson.Version.split('+')[0];
    }

    async getAppCollectionLocalDiffs(appCollection: AppCollection): Promise<Diff[]> {
        const appCollectionDiffPromises: Promise<Diff>[] = [];
        appCollection.apps.forEach((app) => {
            if (app.spec.source?.path !== undefined) {
                appCollectionDiffPromises.push(this.getAppLocalDiff(app));
            }
        });
        return this.getAppCollectionDiffs(appCollectionDiffPromises);
    }

    async getAppCollectionRevisionDiffs(
        appCollection: AppCollection,
        appTargetRevisions: AppTargetRevision[],
    ): Promise<Diff[]> {
        const appCollectionDiffPromises: Promise<Diff>[] = [];
        appTargetRevisions.forEach((appTargetRevision) => {
            const app = appCollection.getAppByName(appTargetRevision.appName);
            if (app) {
                appCollectionDiffPromises.push(
                    this.getAppRevisionDiff(app, appTargetRevision.targetRevision),
                );
            } else {
                core.warning(
                    `Could not find Application '${appTargetRevision.appName}' in AppCollection for revision diffs.`,
                );
            }
        });
        return this.getAppCollectionDiffs(appCollectionDiffPromises);
    }

    async getAppCollectionDiffs(appCollectionDiffPromises: Promise<Diff>[]): Promise<Diff[]> {
        const diffs: Diff[] = [];

        const results = (await Promise.allSettled(appCollectionDiffPromises)).filter(
            result => result.status === 'fulfilled',
        );

        results.forEach((result) => {
            const appDiff = result.value;
            if (appDiff.error) {
                core.setFailed(`ArgoCD diff failed for Application '${appDiff.app.metadata.name}'`);
                diffs.push(appDiff); // Surface the error to the PR comment.
            } else if (appDiff.diff != '') {
                core.info(`Found diff for Application '${appDiff.app.metadata.name}'.`);
                diffs.push(appDiff);
            } else {
                core.debug(`No diff found for Application '${appDiff.app.metadata.name}'.`);
            }
        });

        return diffs;
    }
}
