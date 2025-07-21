import { downloadTool } from '@actions/tool-cache';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import sinon from 'sinon'; // Used for fs because it doesn't work with jest.
import fs from 'fs';
import fetchMock from 'fetch-mock';

import { type App } from '../../src/argocd/App.js';
import { AppCollection } from '../../src/argocd/AppCollection.js';
import { ArgoCDServer } from '../../src/argocd/ArgoCDServer.js';
import { execCommand, type ExecResult } from '../../src/lib.js';
import { type Diff } from '../../src/Diff.js';
import { type AppTargetRevision } from '../../src/argocd/AppTargetRevision.js';
import { ActionInput } from '../../src/getActionInput.js';

// Replaces with jest.fn (auto-mock).
jest.mock('@actions/tool-cache');
const mockedDownloadTool = jest.mocked(downloadTool);

jest.mock('../../src/lib');
const mockedExecCommand = jest.mocked(execCommand);

describe('ArgoCDServer tests', function () {
    let chmodSync: sinon.SinonStub<[path: fs.PathLike, mode: fs.Mode], void>;

    // rest the changes made by mockreturnvauleonce
    beforeEach(() => {
        fetchMock.mockGlobal();
        mockedDownloadTool.mockReset();
        mockedExecCommand.mockReset();
        // Create stub for fs.chmodSync with a return value of `void`.
        chmodSync = sinon.stub(fs, 'chmodSync');
    });

    afterEach(() => {
    // Revert stub setup on chmodSync, in case other tests need it.
        chmodSync.restore();
        fetchMock.clearHistory();
        fetchMock.removeRoutes();
        fetchMock.unmockGlobal();
    });

    test('ArgoCDServer has an fqdn', () => {
        expect(argocdServer().fqdn).toBe('argocd.example');
    });

    test('ArgoCDServer installArgoCDCommand defaults to server version & calls downloadTool', async () => {
        fetchMock.get('https://argocd.example/api/v1/applications?%257D', 200, '{}');
        fetchMock.get('https://argocd.example/api/v1/applications', 200, '{}');

        // mock response from fetch used in getServerVersion.
        fetchMock.anyOnce(
            JSON.stringify({
                Version: 'v2.4.0+91aefab',
            }),
        );
        mockedDownloadTool.mockReturnValueOnce(Promise.resolve('/path/to/tool'));

        await argocdServer().installArgoCDCommand('');

        expect(mockedDownloadTool).toHaveBeenCalledWith(
            'https://github.com/argoproj/argo-cd/releases/download/v2.4.0/argocd-linux-amd64',
            'bin/argo',
        );
    });

    test('ArgoCDServer getAppDiff returns an error', async () => {
        mockedExecCommand.mockReturnValueOnce(Promise.reject(exceCommandAppLocalDiffError()));
        const appDiff: Diff = {
            app: appOne(),
            diff: exceCommandAppLocalDiffError().stdout,
            error: exceCommandAppLocalDiffError(),
        };

        await expect(argocdServer().getAppDiff(appOne())).resolves.toStrictEqual(appDiff);
    });

    test('ArgoCDServer getAppCollection returns a correctly formatted AppCollection', async () => {
        fetchMock.anyOnce(JSON.stringify({ items: [appOne()] }));

        await expect(argocdServer().getAppCollection()).resolves.toEqual(new AppCollection([appOne()]));
    });

    test('ArgoCDServer getAppCollection encounters fetch error and fails', async () => {
        fetchMock.anyOnce(() => {
            throw new Error();
        });

        await expect(argocdServer().getAppCollection()).rejects.toStrictEqual(Error());
    });

    test('An AppCollection gets diffs with --local for each app', async () => {
        const diffs: Diff[] = [
            { app: appOne(), diff: exceCommandAppLocalDiffAppOfApp().stdout },
            {
                app: appThree(),
                diff: exceCommandAppLocalDiffError().stdout,
                error: exceCommandAppLocalDiffError(),
            },
        ];
        mockedExecCommand
            .mockReturnValueOnce(Promise.resolve(exceCommandAppLocalDiffAppOfApp())) // appOne response
            .mockReturnValueOnce(Promise.resolve(exceCommandAppLocalDiffNoDiff())) // appTwo response
            .mockReturnValueOnce(Promise.reject(exceCommandAppLocalDiffError())); // appThree response

        await expect(argocdServer().getAppCollectionLocalDiffs(appCollection())).resolves.toStrictEqual(
            diffs,
        );
        expect(mockedExecCommand).toHaveBeenCalledTimes(appCollection().apps.length);
        expect(mockedExecCommand).toHaveBeenCalledWith(
            `bin/argo app diff --local-repo-root=${process.cwd()} ${appOne().metadata.name} --local=${
                appOne().spec.source?.path
            } --exit-code=false --auth-token=fakeArgoCdToken --server=argocd.example --header "Authorization: Bearer super-secret-bearer-token" --header "X-Example-Header: Some custom value"`,
        );
    });

    test('An AppCollection and AppTargetRevisions get diffs with --revision for each targetRevision', async () => {
        const appTargetRevisions: AppTargetRevision[] = [
            { appName: appThree().metadata.name, targetRevision: '1.2.2' },
            { appName: 'non-existent-app', targetRevision: '' },
        ];
        const diffs: Diff[] = [{ app: appThree(), diff: exceCommandAppRevisionDiff().stdout }];
        mockedExecCommand.mockReturnValueOnce(Promise.resolve(exceCommandAppRevisionDiff())); // appOne response

        await expect(
            argocdServer().getAppCollectionRevisionDiffs(appCollection(), appTargetRevisions),
        ).resolves.toStrictEqual(diffs);
        expect(mockedExecCommand).toHaveBeenCalledTimes(1);
        expect(mockedExecCommand).toHaveBeenCalledWith(
            `bin/argo app diff --local-repo-root=${process.cwd()} ${
                appThree().metadata.name
            } --revision=1.2.2 --exit-code=false --auth-token=fakeArgoCdToken --server=argocd.example --header "Authorization: Bearer super-secret-bearer-token" --header "X-Example-Header: Some custom value"`,
        );
    });
});

function appOne(): App {
    return {
        metadata: {
            name: 'app-one',
        },
        spec: {
            source: {
                repoURL: 'https://github.com/argocd-diff-action/app-one',
                path: 'deploy/app-one',
                targetRevision: 'HEAD',
                helm: {},
                kustomize: {},
            },
        },
        status: {
            sync: {
                status: 'Synced',
            },
        },
    };
}

function appTwo(): App {
    return {
        metadata: {
            name: 'app-two',
        },
        spec: {
            source: {
                repoURL: 'https://github.com/argocd-diff-action/app-two',
                path: 'deploy/app-two',
                targetRevision: 'master',
                helm: {},
                kustomize: {},
            },
        },
        status: {
            sync: {
                status: 'Synced',
            },
        },
    };
}

function appThree(): App {
    return {
        metadata: {
            name: 'app-three',
        },
        spec: {
            source: {
                repoURL: 'https://github.com/argocd-diff-action/app-three',
                path: 'deploy/app-three',
                targetRevision: '1.2.1',
                helm: {},
                kustomize: {},
            },
        },
        status: {
            sync: {
                status: 'Synced',
            },
        },
    };
}

function appCollection(): AppCollection {
    return new AppCollection([appOne(), appTwo(), appThree()]);
}

function argocdServer(): ArgoCDServer {
    const actionInput: ActionInput = {
        arch: 'linux',
        argocd: {
            cliVersion: '1.0.0',
            excludePaths: [],
            extraCliArgs: '',
            fqdn: 'argocd.example',
            headers: new Map<string, string>(Object.entries({
                'Authorization': 'Bearer super-secret-bearer-token',
                'X-Example-Header': 'Some custom value',
            })),
            protocol: 'https',
            token: 'fakeArgoCdToken',
            uri: 'https://argocd.example',
        },
        githubToken: 'fakeGithubToken',
        timezone: 'America/Toronto',
    };
    return new ArgoCDServer(actionInput);
}

function exceCommandAppLocalDiffAppOfApp(): ExecResult {
    return {
        stderr: `INFO[0000] kustomize build ../deploy/app-two  dir= execID=aadda
  INFO[0001] Trace                                         args="[kustomize build ../deploy/app-two]" dir= operation_name="exec kustomize" time_ms=272.935068`,
        stdout: `===== argoproj.io/Application argocd/app-three ======
  175c175
  <     targetRevision: 1.2.1
  ---
  >     targetRevision: 1.2.2`,
    };
}

function exceCommandAppLocalDiffNoDiff(): ExecResult {
    return {
        stderr: `INFO[0000] kustomize build ../deploy/app-two  dir= execID=aadda
  INFO[0001] Trace                                         args="[kustomize build ../deploy/app-two]" dir= operation_name="exec kustomize" time_ms=272.935068`,
        stdout: '',
    };
}

function exceCommandAppLocalDiffError(): ExecResult {
    return {
        stderr: '',
        stdout: '',
        err: new Error('error msg'),
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
    `,
    };
}
