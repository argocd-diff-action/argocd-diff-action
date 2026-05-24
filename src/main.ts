import * as core from '@actions/core';
import * as github from '@actions/github';

import { computeDiffs } from './computeDiffs.js';
import { type Diff } from './Diff.js';
import { buildCommentBodies, commentMarkerPrefix } from './comment.js';
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

    const bodies = buildCommentBodies({
        diffs,
        fqdn: actionInput.argocd.fqdn,
        uri: actionInput.argocd.uri,
        title: `ArgoCD Diff ${actionInput.argocd.fqdn} for commit [\`${shortCommitSha}\`](${commitLink})`,
        updatedAt: `_Updated at ${new Date().toLocaleString('en-CA', { timeZone: actionInput.timezone, timeZoneName: 'short' })}_`,
        headers: actionInput.argocd.headers,
    });

    // Each comment is keyed by a hidden marker carrying the ArgoCD FQDN so that
    // re-runs find and update their own comments instead of stacking new ones.
    const markerPrefix = commentMarkerPrefix(actionInput.argocd.fqdn);
    const commentsResponse = await octokit.rest.issues.listComments({
        issue_number: github.context.issue.number,
        owner,
        repo,
    });
    const existingComments = commentsResponse.data
        .filter(comment => comment.body?.includes(markerPrefix) ?? false)
        .sort((a, b) => a.id - b.id);

    // Nothing to report and nothing posted before: stay silent.
    if (diffs.length === 0 && existingComments.length === 0) {
        return;
    }

    // Reconcile the rendered pages against existing comments: update in place,
    // create any missing pages, and delete leftovers from a larger prior run.
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i] ?? '';
        const existing = existingComments[i];
        if (existing) {
            await octokit.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body });
        }
        else {
            await octokit.rest.issues.createComment({
                issue_number: github.context.issue.number,
                owner,
                repo,
                body,
            });
        }
    }
    for (const comment of existingComments.slice(bodies.length)) {
        await octokit.rest.issues.deleteComment({ owner, repo, comment_id: comment.id });
    }
}
