import { type App, appSources } from './App.js';

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
                const paths = appSources(app)
                    .map(source => source.path)
                    .filter((path): path is string => path !== undefined);

                if (paths.length === 0) {
                    return false;
                }

                return !paths.some(path => excludedPaths.includes(path));
            }),
        );
    }

    filterByRepo(repoMatch: string): AppCollection {
        if (this.apps.length === 0) {
            return this;
        }

        return new AppCollection(
            this.apps.filter((app) => {
                return appSources(app).some(
                    source => source.repoURL !== undefined && source.repoURL.includes(repoMatch),
                );
            }),
        );
    }

    filterByTargetRevision(targetRevisions: string[]): AppCollection {
        if (this.apps.length === 0) {
            return this;
        }

        return new AppCollection(
            this.apps.filter((app) => {
                return appSources(app).some(
                    source => source.targetRevision !== undefined
                        && targetRevisions.includes(source.targetRevision),
                );
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
