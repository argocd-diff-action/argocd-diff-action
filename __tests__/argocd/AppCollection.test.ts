import { expect, test } from '@jest/globals';

import { type App } from '../../src/argocd/App.js';
import { AppCollection } from '../../src/argocd/AppCollection.js';

test('filterByRepo removes apps from other repos', () => {
    expect(appCollection().filterByRepo('argocd-diff-action/app-one')).toStrictEqual(
        new AppCollection([appOne()]),
    );
});

test('filterByTargetRevision removes apps not targeting the trunk', () => {
    expect(appCollection().filterByTargetRevision()).toStrictEqual(
        new AppCollection([appOne(), appTwo()]),
    );
});

test('filterByExcludedPath removes apps in path deploy/app-three', () => {
    expect(appCollection().filterByExcludedPath(['deploy/app-three'])).toStrictEqual(
        new AppCollection([appOne(), appTwo()]),
    );
});

test('filterByExcludedPath with empty ExcludedPaths returns early', () => {
    expect(appCollection().filterByExcludedPath([])).toStrictEqual(appCollection());
});

test('getAppByName returns an App', () => {
    expect(appCollection().getAppByName(appTwo().metadata.name)).toStrictEqual(appTwo());
});

test('getAppByName does not find a App', () => {
    expect(appCollection().getAppByName('non-existent-app-name')).toStrictEqual(undefined);
});

test('empty app collection', () => {
    const appCollection = new AppCollection([]);
    expect(appCollection.getAppByName('non-existent-app-name')).toStrictEqual(undefined);
    expect(appCollection.filterByExcludedPath([])).toStrictEqual(appCollection);
    expect(appCollection.filterByRepo('non-existent-repo')).toStrictEqual(appCollection);
    expect(appCollection.filterByTargetRevision()).toStrictEqual(appCollection);
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

function appCollection(): AppCollection {
    return new AppCollection([appOne(), appTwo()]);
}
