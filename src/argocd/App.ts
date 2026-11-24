export interface App {
    metadata: { name: string };
    spec: {
        source?: {
            repoURL: string;
            path?: string;
            chart?: string;
            targetRevision: string;
            kustomize?: object;
            helm?: object;
        };
    };
    status: {
        sync: {
            status: 'OutOfSync' | 'Synced';
        };
        resources?: AppResourceStatus[];
    };
}

// One entry of an Application's status.resources. ArgoCD leaves `status`
// unset for objects it does not count towards the app's sync state: hooks,
// ignored objects, and objects carrying a tracking ID copied from another
// object (e.g. a Crossplane composite inheriting its claim's annotations).
export interface AppResourceStatus {
    group?: string;
    kind: string;
    namespace?: string;
    name: string;
    status?: 'OutOfSync' | 'Synced' | 'Unknown';
    hook?: boolean;
    requiresPruning?: boolean;
}
