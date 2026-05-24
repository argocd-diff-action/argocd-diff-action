// comment.ts - renders ArgoCD diffs into PR comment bodies that respect
// GitHub's per-comment size limit by splitting across multiple comments and,
// as a last resort, truncating a single oversized app diff by whole resources.
import { type App } from './argocd/App.js';
import { type Diff } from './Diff.js';
import { scrubSecrets } from './lib.js';

// GitHub rejects issue comment bodies longer than 65,536 characters. Stay
// under it with margin for the join newlines and any rendering slack.
export const MAX_COMMENT_LENGTH = 65000;

// Reserved space for the truncation notice, which is added only when an app's
// diff is truncated and so is not counted in the untruncated section length.
const NOTICE_ALLOWANCE = 400;

// ArgoCD separates each changed resource in a diff with a header line like
// `===== apps/Deployment my-namespace/my-app ======`.
const RESOURCE_BOUNDARY = /^={5,} .+ ={5,}$/m;
const RESOURCE_SPLIT = /(?=^={5,} .+ ={5,}$)/m;

const LEGEND = `| Legend | Status |
| :---:  | :---   |
| ✅     | The app is synced in ArgoCD, and diffs you see are solely from this PR. |
| ⚠️      | The app is out-of-sync in ArgoCD, and the diffs you see include those changes plus any from this PR. |
| 🛑     | There was an error generating the ArgoCD diffs due to changes in this PR. |`;

export interface BuildCommentOptions {
    diffs: Diff[];
    fqdn: string;
    uri: string;
    title: string;
    updatedAt: string;
    headers: Map<string, string>;
}

export function commentMarkerPrefix(fqdn: string): string {
    return `<!-- argocd-diff-action ${fqdn} `;
}

function commentMarker(fqdn: string, part: number, total: number): string {
    return `${commentMarkerPrefix(fqdn)}part ${part}/${total} -->`;
}

// Renders the diffs into one or more comment bodies, each within
// MAX_COMMENT_LENGTH. Always returns at least one body so an existing comment
// can be updated to reflect that there are no diffs this round.
export function buildCommentBodies(options: BuildCommentOptions): string[] {
    const { diffs, fqdn, uri, title, updatedAt, headers } = options;

    // Reserve worst-case frame overhead (largest part indicator + legend on
    // every page) so each section is guaranteed to fit once framed.
    const sampleFrame = `${commentMarker(fqdn, 99, 99)}
## ${title} (part 99/99)
${updatedAt}

${LEGEND}`;
    const sectionBudget = MAX_COMMENT_LENGTH - sampleFrame.length;

    const sections = diffs.map(diff => renderAppSection(diff, uri, sectionBudget));

    const pages: string[][] = [];
    let current: string[] = [];
    let currentLength = 0;
    for (const section of sections) {
        if (current.length > 0 && currentLength + section.length + 1 > sectionBudget) {
            pages.push(current);
            current = [];
            currentLength = 0;
        }
        current.push(section);
        currentLength += section.length + 1;
    }
    if (current.length > 0 || pages.length === 0) {
        pages.push(current);
    }

    const total = pages.length;
    return pages.map((pageSections, index) => {
        const part = index + 1;
        const partSuffix = total > 1 ? ` (part ${part}/${total})` : '';
        const body = `${commentMarker(fqdn, part, total)}
## ${title}${partSuffix}
${updatedAt}
${pageSections.join('\n')}

${part === total ? LEGEND : ''}`;
        return scrubSecrets(body, headers);
    });
}

function renderAppSection(diff: Diff, uri: string, budget: number): string {
    const header = renderAppHeader(diff, uri);
    if (!diff.diff) {
        return `${header}
---
`;
    }

    const fullSection = `${header}
${renderDiffBlock(diff.diff)}
---
`;
    if (fullSection.length <= budget) {
        return fullSection;
    }

    const nonDiffLength = fullSection.length - diff.diff.length;
    const diffBudget = Math.max(0, budget - nonDiffLength - NOTICE_ALLOWANCE);
    const { text, shown, total } = truncateDiff(diff.diff, diffBudget);
    return `${header}
${truncationNotice(diff.app, shown, total)}
${renderDiffBlock(text)}
---
`;
}

function renderAppHeader(diff: Diff, uri: string): string {
    const { app, error } = diff;
    const syncStatus = app.status.sync.status === 'Synced' ? 'Synced ✅' : 'Out of Sync ⚠️ ';
    const errorBlock = error
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
        : '';
    return `
App: [\`${app.metadata.name}\`](${uri}/applications/${app.metadata.name})
YAML generation: ${error ? ' Error 🛑' : 'Success 🟢'}
App sync status: ${syncStatus}
${errorBlock}`;
}

function renderDiffBlock(diff: string): string {
    return `<details>

\`\`\`diff
${diff}
\`\`\`

</details>`;
}

// Keeps whole resources from the diff up to the budget. Falls back to a hard
// character cut only when even the first resource exceeds the budget, so the
// comment always shows some content rather than an empty block.
function truncateDiff(diff: string, budget: number): { text: string; shown: number; total: number } {
    const chunks = diff.split(RESOURCE_SPLIT);
    const total = chunks.filter(chunk => RESOURCE_BOUNDARY.test(chunk)).length;

    let text = '';
    let shown = 0;
    for (const chunk of chunks) {
        if (text.length + chunk.length > budget) {
            break;
        }
        text += chunk;
        if (RESOURCE_BOUNDARY.test(chunk)) {
            shown += 1;
        }
    }

    if (text === '') {
        text = diff.slice(0, Math.max(0, budget));
    }

    return { text: text.trimEnd(), shown, total };
}

function truncationNotice(app: App, shown: number, total: number): string {
    const path = app.spec.source?.path;
    const command = path
        ? `argocd app diff ${app.metadata.name} --local=${path}`
        : `argocd app diff ${app.metadata.name}`;
    return `> ⚠️ Diff truncated (showing ${shown}/${total} resources). Run locally to see the full diff:
> \`${command}\``;
}
