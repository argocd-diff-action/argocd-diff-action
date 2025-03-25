import { type App } from './App.js';

export class AppCollection {
    apps: App[];

    constructor(apps: App[]) {
        this.apps = apps;
    }

    filterByExcludedPath(excludedPaths: string[]): AppCollection {
        if (this.apps.length === 0) {
            return this;
        }

        if (excludedPaths.length === 0) {
            return this;
        }

        return new AppCollection(
            this.apps.filter((app) => {
                return app.spec.source?.path !== undefined && !excludedPaths.includes(app.spec.source.path);
            }),
        );
    }

    filterByRepo(repoMatch: string): AppCollection {
        if (this.apps.length === 0) {
            return this;
        }

        return new AppCollection(
            this.apps.filter((app) => {
                console.log(app);
                return app.spec.source?.repoURL !== undefined && app.spec.source.repoURL.includes(repoMatch);
            }),
        );
    }

    filterByTargetRevision(targetRevisions: string[] = ['master', 'main', 'HEAD']): AppCollection {
        if (this.apps.length === 0) {
            return this;
        }
        return new AppCollection(
            this.apps.filter((app) => {
                return app.spec.source?.targetRevision !== undefined && targetRevisions.includes(app.spec.source.targetRevision);
            }),
        );
    }

    getAppByName(name: string): App | undefined {
        if (this.apps.length === 0) {
            return;
        }
        return this.apps.find((app) => {
            return name === app.metadata.name;
        });
    }
}
