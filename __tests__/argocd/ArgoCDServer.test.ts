import { downloadTool } from '@actions/tool-cache';
import { expect, test, jest, describe, beforeEach, afterEach } from '@jest/globals';
import sinon from 'sinon'; // Used for fs because it doesn't work with jest.
import fs from 'fs';

import { App } from '../../src/argocd/App';
import { AppCollection } from '../../src/argocd/AppCollection';
import { ArgoCDServer } from '../../src/argocd/ArgoCDServer';
import { execCommand, ExecResult } from '../../src/lib';
import { Diff } from '../../src/Diff';
import { AppTargetRevision } from '../../src/argocd/AppTargetRevision';

// Replaces with jest.fn (auto-mock).
jest.mock('@actions/tool-cache');
const mockedDownloadTool = jest.mocked(downloadTool, true);

jest.mock('../../src/lib');
const mockedExecCommand = jest.mocked(execCommand, true);

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('node-fetch');

describe('ArgoCDServer tests', function () {
  let chmodSync: any = {};

  // rest the changes made by mockreturnvauleonce
  beforeEach(() => {
    mockedDownloadTool.mockReset();
    mockedExecCommand.mockReset();
    // Create stub for fs.chmodSync with a return value of `void`.
    chmodSync = sinon.stub(fs, 'chmodSync');
  });

  afterEach(() => {
    // Revert stub setup on chmodSync, in case other tests need it.
    chmodSync.restore();
    fetchMock.reset();
  });

  test('ArgoCDServer has an fqdn', () => {
    expect(argocdServer().fqdn).toBe('argocd.example');
  });

  test('ArgoCDServer installArgoCDCommand defaults to server version & calls downloadTool', async () => {
    // mock response from fetch used in getServerVersion.
    fetchMock.anyOnce(
      JSON.stringify({
        Version: 'v2.4.0+91aefab'
      })
    );
    mockedDownloadTool.mockReturnValueOnce(Promise.resolve('/path/to/tool'));

    await argocdServer().installArgoCDCommand('');

    expect(mockedDownloadTool).toHaveBeenCalledWith(
      'https://github.com/argoproj/argo-cd/releases/download/v2.4.0/argocd-linux-amd64',
      'bin/argo'
    );
  });

  test('ArgoCDServer getAppDiff returns an error', () => {
    mockedExecCommand.mockReturnValueOnce(Promise.reject(exceCommandAppLocalDiffError()));
    let appDiff: Diff = {
      app: appOne(),
      diff: exceCommandAppLocalDiffError().stdout,
      error: exceCommandAppLocalDiffError()
    };

    expect(argocdServer().getAppDiff(appOne())).resolves.toStrictEqual(appDiff);
  });

  test('ArgoCDServer getAppCollection returns a correctly formatted AppCollection', async () => {
    fetchMock.anyOnce(JSON.stringify({ items: [appOne()] }));

    expect(argocdServer().getAppCollection()).resolves.toStrictEqual(new AppCollection([appOne()]));
  });

  test('ArgoCDServer getAppCollection encounters fetch error and fails', async () => {
    fetchMock.anyOnce(() => {
      throw new Error();
    });

    expect(argocdServer().getAppCollection()).rejects.toStrictEqual(Error());
  });

  test('An AppCollection gets diffs with --local for each app', async () => {
    let diffs: Diff[] = [
      { app: appOne(), diff: exceCommandAppLocalDiffAppOfApp().stdout },
      {
        app: appThree(),
        diff: exceCommandAppLocalDiffError().stdout,
        error: exceCommandAppLocalDiffError()
      }
    ];
    mockedExecCommand
      .mockReturnValueOnce(Promise.resolve(exceCommandAppLocalDiffAppOfApp())) // appOne response
      .mockReturnValueOnce(Promise.resolve(exceCommandAppLocalDiffNoDiff())) // appTwo response
      .mockReturnValueOnce(Promise.reject(exceCommandAppLocalDiffError())); // appThree response

    await expect(argocdServer().getAppCollectionLocalDiffs(appCollection())).resolves.toStrictEqual(
      diffs
    );
    expect(mockedExecCommand).toBeCalledTimes(appCollection().apps.length);
    expect(mockedExecCommand).toHaveBeenCalledWith(
      `bin/argo app diff ${appOne().metadata.name} --local=${
        appOne().spec.source.path
      } --exit-code=false --auth-token=tokenfake --server=argocd.example `
    );
  });

  test('An AppCollection and AppTargetRevisions get diffs with --revision for each targetRevision', async () => {
    let appTargetRevisions: AppTargetRevision[] = [
      { appName: appThree().metadata.name, targetRevision: '1.2.2' },
      { appName: 'non-existent-app', targetRevision: '' }
    ];
    let diffs: Diff[] = [{ app: appThree(), diff: exceCommandAppRevisionDiff().stdout }];
    mockedExecCommand.mockReturnValueOnce(Promise.resolve(exceCommandAppRevisionDiff())); // appOne response

    await expect(
      argocdServer().getAppCollectionRevisionDiffs(appCollection(), appTargetRevisions)
    ).resolves.toStrictEqual(diffs);
    expect(mockedExecCommand).toBeCalledTimes(1);
    expect(mockedExecCommand).toHaveBeenCalledWith(
      `bin/argo app diff ${
        appThree().metadata.name
      } --revision=1.2.2 --exit-code=false --auth-token=tokenfake --server=argocd.example `
    );
  });
});

function appOne(): App {
  return {
    metadata: {
      name: 'app-one'
    },
    spec: {
      source: {
        repoURL: 'https://github.com/argocd-diff-action/app-one',
        path: 'deploy/app-one',
        targetRevision: 'HEAD',
        helm: {},
        kustomize: {}
      }
    },
    status: {
      sync: {
        status: 'Synced'
      }
    }
  };
}

function appTwo(): App {
  return {
    metadata: {
      name: 'app-two'
    },
    spec: {
      source: {
        repoURL: 'https://github.com/argocd-diff-action/app-two',
        path: 'deploy/app-two',
        targetRevision: 'master',
        helm: {},
        kustomize: {}
      }
    },
    status: {
      sync: {
        status: 'Synced'
      }
    }
  };
}

function appThree(): App {
  return {
    metadata: {
      name: 'app-three'
    },
    spec: {
      source: {
        repoURL: 'https://github.com/argocd-diff-action/app-three',
        path: 'deploy/app-three',
        targetRevision: '1.2.1',
        helm: {},
        kustomize: {}
      }
    },
    status: {
      sync: {
        status: 'Synced'
      }
    }
  };
}

function appCollection(): AppCollection {
  return new AppCollection([appOne(), appTwo(), appThree()]);
}

function argocdServer(): ArgoCDServer {
  return new ArgoCDServer('argocd.example', 'tokenfake');
}

function exceCommandAppLocalDiffAppOfApp(): ExecResult {
  return {
    stderr: `INFO[0000] kustomize build ../deploy/app-two  dir= execID=aadda
  INFO[0001] Trace                                         args="[kustomize build ../deploy/app-two]" dir= operation_name="exec kustomize" time_ms=272.935068`,
    stdout: `===== argoproj.io/Application argocd/app-three ======
  175c175
  <     targetRevision: 1.2.1
  ---
  >     targetRevision: 1.2.2`
  };
}

function exceCommandAppLocalDiffNoDiff(): ExecResult {
  return {
    stderr: `INFO[0000] kustomize build ../deploy/app-two  dir= execID=aadda
  INFO[0001] Trace                                         args="[kustomize build ../deploy/app-two]" dir= operation_name="exec kustomize" time_ms=272.935068`,
    stdout: ''
  };
}

function exceCommandAppLocalDiffError(): ExecResult {
  return {
    stderr: '',
    stdout: '',
    err: new Error('error msg')
  };
}

function exceCommandAppRevisionDiff(): ExecResult {
  return {
    stderr: '',
    stdout: `
    ===== /ServiceAccount default/app-three ======
    11c11
    <     helm.sh/chart: app-three-1.2.1
    ---
    >     helm.sh/chart: app-three-1.2.2
    
    ===== apps/Deployment default/cd-slack-bot ======
    14c14
    <     helm.sh/chart: app-three-1.2.1
    ---
    >     helm.sh/chart: app-three-1.2.2
    270d369
    `
  };
}
