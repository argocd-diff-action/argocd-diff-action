import { chmodSync } from 'fs';
import * as core from '@actions/core';
import { downloadTool } from '@actions/tool-cache';
import fetch from 'node-fetch';

import { App } from './App';
import { AppCollection } from './AppCollection';
import { AppTargetRevision } from './AppTargetRevision';
import { Diff } from '../Diff';
import { ExecResult, execCommand, scrubSecrets } from '../lib';

export class ArgoCDServer {
  binaryPath = 'bin/argo';
  extraCommandArgs: string;
  fqdn: string;
  token: string;

  constructor(fqdn: string, token: string, extraCommandArgs = '') {
    this.fqdn = fqdn;
    this.token = token;
    this.extraCommandArgs = extraCommandArgs;
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
    core.debug(`Running: ${scrubSecrets(cmd)}`);
    return execCommand(cmd);
  }

  async getAppLocalDiff(app: App): Promise<Diff> {
    return this.getAppDiff(app, [`--local=${app.spec.source.path}`]);
  }

  async getAppRevisionDiff(app: App, targetRevision: string): Promise<Diff> {
    return this.getAppDiff(app, [`--revision=${targetRevision}`]);
  }

  async getAppDiff(app: App, params: string[] = []): Promise<Diff> {
    let res: ExecResult;
    try {
      res = await this.command(
        `app diff ${app.metadata.name} ${params.join(' ')} --exit-code=false`
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
    // core.debug(`Making API call to: '${this.fqdn}/api/${endpoint}'`);
    const url = `https://${this.fqdn}/api/${endpoint}?${params.join('&')}}`;
    core.debug(`Making API call to: '${url}'`);

    // node-fetch response.json() returns `unknown`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseJson: any;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { Cookie: `argocd.token=${this.token}` }
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
    const fields = [
      'items.metadata.name',
      'items.spec.source.path',
      'items.spec.source.repoURL',
      'items.spec.source.targetRevision',
      'items.spec.source.helm',
      'items.spec.source.kustomize',
      'items.status.sync.status'
    ];

    let responseJson = await this.api('v1/applications', [`fields=${fields.join(',')}`]);
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
      appCollectionDiffPromises.push(this.getAppLocalDiff(app));
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
    ) as PromiseFulfilledResult<Diff>[];

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
