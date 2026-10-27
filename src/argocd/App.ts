export interface AppSource {
    repoURL: string;
    path?: string;
    chart?: string;
    targetRevision: string;
    kustomize?: object;
    helm?: object;
    ref?: string;
}

export interface App {
    metadata: { name: string };
    spec: {
        source?: AppSource;
        sources?: AppSource[];
    };
    status: {
        sync: {
            status: 'OutOfSync' | 'Synced';
        };
    };
}

// Every source of an App in spec order, whether it declares the single
// `spec.source` or the `spec.sources` list of a multi-source App.
export function appSources(app: App): AppSource[] {
    if (app.spec.sources !== undefined && app.spec.sources.length > 0) {
        return app.spec.sources;
    }

    return app.spec.source !== undefined ? [app.spec.source] : [];
}

// Mirrors ArgoCD's own ApplicationSpec.HasMultipleSources(): the presence of
// `spec.sources` is what makes an App multi-source, even with a single entry.
export function hasMultipleSources(app: App): boolean {
    return (app.spec.sources?.length ?? 0) > 0;
}

// Positions of the sources that point at the given repo, counting from 1 the
// way `argocd app diff --source-positions` does.
export function matchingSourcePositions(app: App, repoMatch: string): number[] {
    return appSources(app)
        .map((source, index) => (source.repoURL?.includes(repoMatch) ? index + 1 : 0))
        .filter(position => position !== 0);
}
