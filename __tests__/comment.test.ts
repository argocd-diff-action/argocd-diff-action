import { expect, test } from 'vitest';

import { type App } from '../src/argocd/App.js';
import { type Diff } from '../src/Diff.js';
import { buildCommentBodies, commentMarkerPrefix, MAX_COMMENT_LENGTH } from '../src/comment.js';

const fqdn = 'argocd.example.com';

function options(diffs: Diff[]): Parameters<typeof buildCommentBodies>[0] {
    return {
        diffs,
        fqdn,
        uri: `https://${fqdn}`,
        title: `ArgoCD Diff ${fqdn} for commit [\`abc1234\`](https://example.com)`,
        updatedAt: '_Updated at 2026-05-23_',
        headers: new Map<string, string>(),
    };
}

function bodyAt(bodies: string[], index: number): string {
    const body = bodies.at(index);
    if (body === undefined) {
        throw new Error(`expected a comment body at index ${index}`);
    }
    return body;
}

function app(name: string, path = `deploy/${name}`): App {
    return {
        metadata: { name },
        spec: { source: { repoURL: `https://github.com/org/${name}`, path, targetRevision: 'HEAD' } },
        status: { sync: { status: 'Synced' } },
    };
}

function diffOfLength(length: number): string {
    let out = '===== apps/Deployment default/app ======\n';
    while (out.length < length) {
        out += '> spec.replicas: 1\n';
    }
    return out.slice(0, length);
}

function manyResources(count: number): string {
    let out = '';
    for (let i = 0; i < count; i++) {
        out += `===== apps/Deployment default/app-${i} ======\n`;
        out += '> spec.replicas: 1\n'.repeat(20);
    }
    return out;
}

test('small diffs render to a single comment with the legend and no part suffix', () => {
    const bodies = buildCommentBodies(options([
        { app: app('app-one'), diff: '===== apps/Deployment default/app-one ======\n> spec.replicas: 1' },
        { app: app('app-two'), diff: '===== apps/Deployment default/app-two ======\n> spec.replicas: 2' },
    ]));

    expect(bodies).toHaveLength(1);
    const body = bodyAt(bodies, 0);
    expect(body).toContain(commentMarkerPrefix(fqdn));
    expect(body).toContain('app-one');
    expect(body).toContain('app-two');
    expect(body).toContain('| Legend | Status |');
    expect(body).not.toContain('(part');
    expect(body.length).toBeLessThanOrEqual(MAX_COMMENT_LENGTH);
});

test('no diffs and no prior comment still yields one updatable body', () => {
    const bodies = buildCommentBodies(options([]));

    expect(bodies).toHaveLength(1);
    expect(bodyAt(bodies, 0)).toContain('| Legend | Status |');
});

test('diffs exceeding one comment split across multiple comments under the limit', () => {
    const diffs: Diff[] = Array.from({ length: 4 }, (_, i) => ({
        app: app(`app-${i}`),
        diff: diffOfLength(30000),
    }));

    const bodies = buildCommentBodies(options(diffs));

    expect(bodies.length).toBeGreaterThan(1);
    bodies.forEach((body, index) => {
        expect(body.length).toBeLessThanOrEqual(MAX_COMMENT_LENGTH);
        expect(body).toContain(`part ${index + 1}/${bodies.length}`);
        expect(body).toContain(`(part ${index + 1}/${bodies.length})`);
    });
    // Legend only on the final comment.
    expect(bodyAt(bodies, -1)).toContain('| Legend | Status |');
    expect(bodyAt(bodies, 0)).not.toContain('| Legend | Status |');
    expect(bodies.every(body => !body.includes('Diff truncated'))).toBe(true);
});

test('a single oversized app diff is truncated by whole resources with a notice', () => {
    const bodies = buildCommentBodies(options([
        { app: app('huge-app'), diff: manyResources(200) },
    ]));

    expect(bodies).toHaveLength(1);
    const body = bodyAt(bodies, 0);
    expect(body.length).toBeLessThanOrEqual(MAX_COMMENT_LENGTH);
    expect(body).toContain('Diff truncated');
    expect(body).toMatch(/showing \d+\/200 resources/);
    expect(body).toContain('argocd app diff huge-app --local=deploy/huge-app');
});

test('secrets in the diff are scrubbed from the rendered body', () => {
    const headers = new Map<string, string>([['Authorization', 'Bearer super-secret']]);
    const bodies = buildCommentBodies({
        ...options([{ app: app('app-one'), diff: 'header --header "Authorization: Bearer super-secret"' }]),
        headers,
    });

    const body = bodyAt(bodies, 0);
    expect(body).toContain('Authorization: ***');
    expect(body).not.toContain('Bearer super-secret');
});
