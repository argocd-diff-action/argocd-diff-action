import * as core from '@actions/core';
import * as github from '@actions/github';

import { type AppTargetRevision } from './argocd/AppTargetRevision.js';
import { ArgoCDServer } from './argocd/ArgoCDServer.js';
import { type Diff } from './Diff.js';
import { scrubSecrets } from './lib.js';
import getActionInput, { ActionInput } from './getActionInput.js';

run().catch((e) => {
    console.error(e);
    core.setFailed(e);
});

async function run(): Promise<void> {
    const actionInput = getActionInput();
    const argocdServer = new ArgoCDServer(actionInput);
    await argocdServer.installArgoCDCommand(actionInput.argocd.cliVersion, actionInput.arch);

    const appAllCollection = await argocdServer.getAppCollection();
    if (appAllCollection.apps == null) {
    // When the account used for the API key does not have at least read-only
    // access it will result in no Applications being returned.
        core.warning(
            'No Applications were returned from Argo CD. This may be the result of insufficient privileges.',
        );
        return;
    }
    // We can only run `diff --local` on files that are for this current repo.
    // Filter Apps to those following the repo trunk, since that is what the PR is
    // comparing against (in most cases).
    const appLocalCollection = appAllCollection
        .filterByRepo(`${github.context.repo.owner}/${github.context.repo.repo}`)
        .filterByTargetRevision()
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

    await postDiffComment([...appDiffs, ...appOfAppDiffs], actionInput);
}

async function postDiffComment(diffs: Diff[], actionInput: ActionInput): Promise<void> {
    const octokit = github.getOctokit(actionInput.githubToken);
    const { owner, repo } = github.context.repo;
    const sha = github.context.payload.pull_request?.head?.sha;

    const commitLink = `https://github.com/${owner}/${repo}/pull/${github.context.issue.number}/commits/${sha}`;
    const shortCommitSha = String(sha).substring(0, 7);

    const diffOutput = diffs.map(
        ({ app, diff, error }) => `
App: [\`${app.metadata.name}\`](${actionInput.argocd.uri}/applications/${app.metadata.name})
YAML generation: ${error ? ' Error 🛑' : 'Success 🟢'}
App sync status: ${app.status.sync.status === 'Synced' ? 'Synced ✅' : 'Out of Sync ⚠️ '}
${
    error
        ? `
**\`stderr:\`**
\`\`\`
${error.stderr}
\`\`\`

**\`command:\`**
\`\`\`json
${JSON.stringify(error.err)}
\`\`\`
`
        : ''
}

${
    diff
        ? `
<details>

\`\`\`diff
${diff}
\`\`\`

</details>
`
        : ''
}
---
`,
    );

    // Use a unique value at the beginning of each comment so we can find the correct comment for the argocd server FQDN
    const headerPrefix = `<!-- argocd-diff-action ${actionInput.argocd.fqdn} -->`;
    const header = `${headerPrefix}
## ArgoCD Diff ${actionInput.argocd.fqdn} for commit [\`${shortCommitSha}\`](${commitLink})
`;

    const output = scrubSecrets(`${header}
_Updated at ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} PT_
  ${diffOutput.join('\n')}

| Legend | Status |
| :---:  | :---   |
| ✅     | The app is synced in ArgoCD, and diffs you see are solely from this PR. |
| ⚠️      | The app is out-of-sync in ArgoCD, and the diffs you see include those changes plus any from this PR. |
| 🛑     | There was an error generating the ArgoCD diffs due to changes in this PR. |
`);

    const commentsResponse = await octokit.rest.issues.listComments({
        issue_number: github.context.issue.number,
        owner,
        repo,
    });

    const existingComment = commentsResponse.data.find(
        d => d.body?.includes(headerPrefix) ?? false,
    );

    // Existing comments should be updated even if there are no changes this round in order to indicate that
    if (existingComment) {
        octokit.rest.issues.updateComment({
            owner,
            repo,
            comment_id: existingComment.id,
            body: output,
        });
    // Only post a new comment when there are changes
    }
    else if (diffs.length) {
        octokit.rest.issues.createComment({
            issue_number: github.context.issue.number,
            owner,
            repo,
            body: output,
        });
    }
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
