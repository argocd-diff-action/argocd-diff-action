import * as core from '@actions/core';
import * as github from '@actions/github';

// local imports
import { AppTargetRevision } from './argocd/AppTargetRevision';
import { ArgoCDServer } from './argocd/ArgoCDServer';
import { Diff } from './Diff';
import { scrubSecrets } from './lib';

const ARCH = process.env.ARCH || 'linux';
const githubToken = core.getInput('github-token');
core.info(githubToken);

const ARGOCD_SERVER_FQDN = core.getInput('argocd-server-fqdn');
const ARGOCD_TOKEN = core.getInput('argocd-token');
const VERSION = core.getInput('argocd-version');
const EXTRA_CLI_ARGS = core.getInput('argocd-extra-cli-args');
const EXCLUDE_PATHS = core.getInput('argocd-exclude-paths').split(',');
const octokit = github.getOctokit(githubToken);

async function postDiffComment(diffs: Diff[]): Promise<void> {
  const { owner, repo } = github.context.repo;
  const sha = github.context.payload.pull_request?.head?.sha;

  const commitLink = `https://github.com/${owner}/${repo}/pull/${github.context.issue.number}/commits/${sha}`;
  const shortCommitSha = String(sha).substring(0, 7);

  const diffOutput = diffs.map(
    ({ app, diff, error }) => `   
App: [\`${app.metadata.name}\`](https://${ARGOCD_SERVER_FQDN}/applications/${app.metadata.name}) 
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
`
  );

  const output = scrubSecrets(`
## ArgoCD Diff for commit [\`${shortCommitSha}\`](${commitLink})
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
    repo
  });

  const existingComment = commentsResponse.data.find(
    d => d.body?.includes('ArgoCD Diff for') ?? false
  );

  // Existing comments should be updated even if there are no changes this round in order to indicate that
  if (existingComment) {
    octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: output
    });
    // Only post a new comment when there are changes
  } else if (diffs.length) {
    octokit.rest.issues.createComment({
      issue_number: github.context.issue.number,
      owner,
      repo,
      body: output
    });
  }
}

async function run(): Promise<void> {
  const argocdServer = new ArgoCDServer(ARGOCD_SERVER_FQDN, ARGOCD_TOKEN, EXTRA_CLI_ARGS);
  await argocdServer.installArgoCDCommand(VERSION, ARCH);

  let appAllCollection = await argocdServer.getAppCollection();
  if (appAllCollection.apps == null) {
    // When the account used for the API key does not have at least read-only, it will result in no Applications being returned.
    core.warning(
      'No Applications were returned from Argo CD. This may be the result of insufficient privileges.'
    );
    return;
  }
  // We can only run `diff --local` on files that are for this current repo.
  // Filter Apps to those following the repo trunk, since that is what the PR is
  // comparing against (in most cases).
  let appLocalCollection = appAllCollection
    .filterByRepo(`${github.context.repo.owner}/${github.context.repo.repo}`)
    .filterByTargetRevision()
    .filterByExcludedPath(EXCLUDE_PATHS);

  core.info(`Found apps: ${appLocalCollection.apps.map(a => a.metadata.name).join(', ')}`);

  let appDiffs = await argocdServer.getAppCollectionLocalDiffs(appLocalCollection);

  // Get diffs for apps of apps with targetRevision changes from local app diffs.
  // Note that this won't include any other changes to the App of App (e.g., Helm
  // value changes).
  let appOfAppTargetRevisions = getAppOfAppTargetRevisions(appDiffs);
  let appofAppDiffs = await argocdServer.getAppCollectionRevisionDiffs(
    appAllCollection,
    appOfAppTargetRevisions
  );

  await postDiffComment([...appDiffs, ...appofAppDiffs]);
}

run().catch(e => {
  console.error(e);
  core.setFailed(e);
});

function getAppOfAppTargetRevisions(diffs: Diff[]): AppTargetRevision[] {
  let appTargetRevisions: AppTargetRevision[] = [];
  diffs.forEach(appDiff => {
    // Check for diffs of an Application (App of App).
    if (appDiff.diff.includes('argoproj.io/Application')) {
      core.debug(`Found Application in the diff for Application '${appDiff.app.metadata.name}'.`);
      let changedResourceDiffs = appDiff.diff.split('===== ([\\w\\S]+/[\\w\\S]+ ){2}======');

      changedResourceDiffs.forEach(async diff => {
        let match = diff.match(
          '===== (?:argoproj.io\\/Application) (\\w+/\\S+) ======\\n(?:.*\\n)*>\\s+targetRevision: (.*)'
        );
        if (match) {
          const appName = match[1].split('/')[1];
          const targetRevision = match[2];
          core.info(
            `Found targetRevision change on Application '${appName}' of Application '${appDiff.app.metadata.name}'.`
          );
          appTargetRevisions.push({ appName: appName, targetRevision: targetRevision });
        }
      });
    } else {
      core.debug(
        `No targetRevision change found in Applications of Application '${appDiff.app.metadata.name}'.`
      );
    }
  });
  return appTargetRevisions;
}
