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
    };
}
