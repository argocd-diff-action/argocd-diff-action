export interface App {
  metadata: { name: string };
  spec: {
    source?: {
      repoURL: string;
      path?: string;
      chart?: string;
      targetRevision: string;
      kustomize?: Object;
      helm?: Object;
    };
  };
  status: {
    sync: {
      status: 'OutOfSync' | 'Synced';
    };
  };
}
