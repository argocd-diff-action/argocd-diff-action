import * as core from '@actions/core';
import * as github from '@actions/github';

import { type AppTargetRevision } from './argocd/AppTargetRevision.js';
import { ArgoCDServer } from './argocd/ArgoCDServer.js';
import { type Diff } from './Diff.js';
import { ActionInput } from './getActionInput.js';

// Computes the ArgoCD diffs for the current repo without posting anything to
// GitHub. Returns null when the server returns no Applications (e.g. the token
// lacks read access), so callers can skip posting a comment.
export async function computeDiffs(actionInput: ActionInput): Promise<Diff[] | null> {
    const argocdServer = new ArgoCDServer(actionInput);
    await argocdServer.installArgoCDCommand(actionInput.argocd.cliVersion, actionInput.arch);

    const appAllCollection = await argocdServer.getAppCollection();
    if (appAllCollection.apps == null) {
        // When the account used for the API key does not have at least read-only
        // access it will result in no Applications being returned.
        core.warning(
            'No Applications were returned from Argo CD. This may be the result of insufficient privileges.',
        );
        return null;
    }
    // We can only run `diff --local` on files that are for this current repo.
    // Filter Apps to those following the repo trunk, since that is what the PR is
    // comparing against (in most cases).
    const appLocalCollection = appAllCollection
        .filterByRepo(`${github.context.repo.owner}/${github.context.repo.repo}`)
        .filterByTargetRevision(actionInput.argocd.targetRevisions)
        .filterByExcludedPath(actionInput.argocd.excludePaths);

    core.info(`Found apps: ${appLocalCollection.apps.map(a => a.metadata.name).join(', ')}`);

    const appDiffs = await argocdServer.getAppCollectionLocalDiffs(appLocalCollection);

    // Get diffs for apps of apps with targetRevision changes from local app diffs.
    // Note that this won't include any other changes to the App of App (e.g., Helm
    // value changes).
    const appOfAppTargetRevisions = getAppOfAppTargetRevisions(appDiffs);
    const appOfAppDiffs = await argocdServer.getAppCollectionRevisionDiffs(
        appAllCollection,
        appOfAppTargetRevisions,
    );

    return [...appDiffs, ...appOfAppDiffs];
}

function getAppOfAppTargetRevisions(diffs: Diff[]): AppTargetRevision[] {
    const appTargetRevisions: AppTargetRevision[] = [];
    diffs.forEach((appDiff) => {
    // Check for diffs of an Application (App of App).
        if (appDiff.diff.includes('argoproj.io/Application')) {
            core.debug(`Found Application in the diff for Application '${appDiff.app.metadata.name}'.`);
            const changedResourceDiffs = appDiff.diff.split('===== ([\\w\\S]+/[\\w\\S]+ ){2}======');

            changedResourceDiffs.forEach(async (diff) => {
                const match = diff.match(
                    '===== (?:argoproj.io\\/Application) (\\w+/\\S+) ======\\n(?:.*\\n)*>\\s+targetRevision: (.*)',
                );
                if (match) {
                    const appName = match[1]?.split('/')[1] ?? 'undefined';
                    const targetRevision = match[2] ?? 'undefined';
                    core.info(
                        `Found targetRevision change on Application '${appName}' of Application '${appDiff.app.metadata.name}'.`,
                    );
                    appTargetRevisions.push({ appName: appName, targetRevision: targetRevision });
                }
            });
        }
        else {
            core.debug(
                `No targetRevision change found in Applications of Application '${appDiff.app.metadata.name}'.`,
            );
        }
    });
    return appTargetRevisions;
}
