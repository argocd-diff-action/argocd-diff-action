import { chmodSync } from 'fs';
import * as core from '@actions/core';
import { downloadTool } from '@actions/tool-cache';

import { type App } from './App.js';
import { AppCollection } from './AppCollection.js';
import { type AppTargetRevision } from './AppTargetRevision.js';
import { type Diff } from '../Diff.js';
import { type ExecResult, execCommand, scrubSecrets } from '../lib.js';
import { ActionInput } from '../getActionInput.js';

export class ArgoCDServer {
  binaryPath = 'bin/argo';
  extraCommandArgs: string;
  uri: string;
  fqdn: string;
  token: string;
  headers: Record<string, string>;

  constructor(actionInput: ActionInput) {
    this.uri = actionInput.argocd.uri;
    this.fqdn = actionInput.argocd.fqdn;
    this.token = actionInput.argocd.token;
    this.extraCommandArgs = actionInput.argocd.extraCliArgs;
    this.headers = actionInput.argocd.headers
  }

  async installArgoCDCommand(version: string, arch = 'linux'): Promise<void> {
    if (version == '') {
      version = await this.getServerVersion();
    }

    await downloadTool(
      `https://github.com/argoproj/argo-cd/releases/download/${version}/argocd-${arch}-amd64`,
      this.binaryPath
    );
    chmodSync(this.binaryPath, '755');
  }

  async command(params: string): Promise<ExecResult> {
    let cmd = `${this.binaryPath} ${params} --auth-token=${this.token} --server=${this.fqdn} ${this.extraCommandArgs}`;
    if (Object.keys(this.headers).length !== 0) {
      for (const header of Object.entries(this.headers)) {
        cmd += `--header "${header[0]}: ${header[1]}" `;
      }
    }
    core.debug(`Running: ${scrubSecrets(cmd)}`);
    return execCommand(cmd);
  }

  async getAppLocalDiff(app: App): Promise<Diff> {
    if (app.spec.source?.path === undefined) {
      core.error(`Cannot diff ${app.metadata.name}, no source.path`);

      return { app, diff: '' } as Diff;
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
        `app diff --local-repo-root=${process.cwd()} ${app.metadata.name} ${params.join(' ')} --exit-code=false`
      );
      core.debug(`stdout: ${res.stdout}`);
      core.debug(`stderr: ${res.stderr}`);
      return { app, diff: res.stdout } as Diff;
    } catch (e) {
      res = e as ExecResult;
      core.error('Unexpected error when fetching app diff:');
      core.error(`${res.err}`);
      return { app, diff: '', error: res } as Diff;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async api(endpoint: string, params: string[] = [], method = 'GET'): Promise<any> {
    const url = `https://${this.fqdn}/api/${endpoint}?${params.join('&')}}`;
    core.debug(`Making API call to: '${url}'`);

    // response.json() returns `any`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseJson: any;

    try {
      let headers = { Cookie: `argocd.token=${this.token}` }
      if (Object.keys(this.headers).length !== 0) {
        headers = { ...headers, ...this.headers }
      }
      core.debug(`Making request with headers: ${Object.keys(headers)}`);
      const response = await fetch(url, {
        method: method,
        headers: headers
      });
      core.debug(`API call response code: ${response.status}`);
      responseJson = await response.json();
    } catch (err) {
      if (err instanceof Error) {
        core.error(`Failed to fetch ${endpoint} from ${this.fqdn}.`);
        core.error(err.message);
      }
      throw err;
    }

    if (responseJson.error) {
      core.error('Error returned by API');
      core.error(responseJson);
    }

    return responseJson;
  }

  async getAppCollection(): Promise<AppCollection> {
    let responseJson = await this.api('v1/applications');
    return new AppCollection(responseJson.items);
  }

  async getServerVersion(): Promise<string> {
    let responseJson = await this.api('version');
    // Return the release tag without the build metadata (e.g., v2.4.0+91aefab -> v2.4.0).
    return responseJson.Version.split('+')[0];
  }

  async getAppCollectionLocalDiffs(appCollection: AppCollection): Promise<Diff[]> {
    let appCollectionDiffPromises: Promise<Diff>[] = [];
    appCollection.apps.forEach(app => {
      if (app.spec.source?.path !== undefined) {
        appCollectionDiffPromises.push(this.getAppLocalDiff(app));
      }
    });
    return this.getAppCollectionDiffs(appCollectionDiffPromises);
  }

  async getAppCollectionRevisionDiffs(
    appCollection: AppCollection,
    appTargetRevisions: AppTargetRevision[]
  ): Promise<Diff[]> {
    let appCollectionDiffPromises: Promise<Diff>[] = [];
    appTargetRevisions.forEach(appTargetRevision => {
      let app = appCollection.getAppByName(appTargetRevision.appName);
      if (app) {
        appCollectionDiffPromises.push(
          this.getAppRevisionDiff(app, appTargetRevision.targetRevision)
        );
      } else {
        core.warning(
          `Could not find Application '${appTargetRevision.appName}' in AppCollection for revision diffs.`
        );
      }
    });
    return this.getAppCollectionDiffs(appCollectionDiffPromises);
  }

  async getAppCollectionDiffs(appCollectionDiffPromises: Promise<Diff>[]): Promise<Diff[]> {
    const diffs: Diff[] = [];

    let results = (await Promise.allSettled(appCollectionDiffPromises)).filter(
      result => result.status === 'fulfilled'
    );

    results.forEach(result => {
      let appDiff = result.value;
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
