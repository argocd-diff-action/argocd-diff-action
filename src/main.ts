import * as core from '@actions/core';
import * as github from '@actions/github';

import { computeDiffs } from './computeDiffs.js';
import { type Diff } from './Diff.js';
import { scrubSecrets } from './lib.js';
import getActionInput, { ActionInput } from './getActionInput.js';

run().catch((e) => {
    console.error(e);
    core.setFailed(e);
});

async function run(): Promise<void> {
    const actionInput = getActionInput();
    const diffs = await computeDiffs(actionInput);
    if (diffs === null) {
        return;
    }
    await postDiffComment(diffs, actionInput);
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
_Updated at ${new Date().toLocaleString('en-CA', { timeZone: actionInput.timezone })} PT_
  ${diffOutput.join('\n')}

| Legend | Status |
| :---:  | :---   |
| ✅     | The app is synced in ArgoCD, and diffs you see are solely from this PR. |
| ⚠️      | The app is out-of-sync in ArgoCD, and the diffs you see include those changes plus any from this PR. |
| 🛑     | There was an error generating the ArgoCD diffs due to changes in this PR. |
`, actionInput.argocd.headers);

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
        await octokit.rest.issues.updateComment({
            owner,
            repo,
            comment_id: existingComment.id,
            body: output,
        });
    // Only post a new comment when there are changes
    }
    else if (diffs.length) {
        await octokit.rest.issues.createComment({
            issue_number: github.context.issue.number,
            owner,
            repo,
            body: output,
        });
    }
}
