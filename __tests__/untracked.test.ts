import { describe, expect, test } from 'vitest';

import { type App, type AppResourceStatus } from '../src/argocd/App.js';
import { stripUntrackedResources } from '../src/untracked.js';

function app(resources: AppResourceStatus[] | undefined): App {
    return {
        metadata: { name: 'cost-dashboard' },
        spec: {},
        status: { sync: { status: 'Synced' }, resources },
    };
}

const composite: AppResourceStatus = {
    group: 'kyosenergy.com',
    kind: 'XEntraApplication',
    name: 'cost-dashboard-q9ffg',
};

const deployment: AppResourceStatus = {
    group: 'apps',
    kind: 'Deployment',
    namespace: 'cost-dashboard',
    name: 'web',
    status: 'Synced',
};

const compositeDeletion = `
===== kyosenergy.com/XEntraApplication /cost-dashboard-q9ffg ======
1,3d0
< apiVersion: kyosenergy.com/v1alpha1
< kind: XEntraApplication
< metadata: {}
`;

const deploymentChange = `
===== apps/Deployment cost-dashboard/web ======
12c12
<         image: web:v1
---
>         image: web:v2
`;

describe('stripUntrackedResources', () => {
    test('drops a whole-object deletion of an object ArgoCD does not track', () => {
        const result = stripUntrackedResources(compositeDeletion + deploymentChange, app([composite, deployment]));

        expect(result.diff).toBe(deploymentChange);
        expect(result.stripped).toEqual(['===== kyosenergy.com/XEntraApplication /cost-dashboard-q9ffg ======']);
    });

    test('returns an empty diff when the untracked object was the only change', () => {
        const result = stripUntrackedResources(compositeDeletion, app([composite]));

        expect(result.diff).toBe('');
    });

    test('keeps the deletion when ArgoCD tracks the object (it has a sync status)', () => {
        const tracked = { ...composite, status: 'OutOfSync' as const, requiresPruning: true };

        expect(stripUntrackedResources(compositeDeletion, app([tracked])).diff).toBe(compositeDeletion);
    });

    test('keeps the deletion when the object is marked for pruning', () => {
        const pruned = { ...composite, requiresPruning: true };

        expect(stripUntrackedResources(compositeDeletion, app([pruned])).diff).toBe(compositeDeletion);
    });

    test('keeps a section that is not a whole-object deletion, e.g. the PR adds a manifest for it', () => {
        const modified = `
===== kyosenergy.com/XEntraApplication /cost-dashboard-q9ffg ======
3c3
< metadata: {}
---
> metadata: { labels: { a: b } }
`;

        expect(stripUntrackedResources(modified, app([composite])).diff).toBe(modified);
    });

    test('matches core-group and namespaced resources by their full key', () => {
        const configMap: AppResourceStatus = { kind: 'ConfigMap', namespace: 'ns', name: 'copied' };
        const diff = `
===== /ConfigMap ns/copied ======
1,2d0
< apiVersion: v1
< kind: ConfigMap
`;

        expect(stripUntrackedResources(diff, app([configMap])).diff).toBe('');
        expect(stripUntrackedResources(diff, app([{ ...configMap, namespace: 'other' }])).diff).toBe(diff);
    });

    test('is a no-op when the app has no resource status', () => {
        expect(stripUntrackedResources(compositeDeletion, app(undefined)).diff).toBe(compositeDeletion);
    });
});
