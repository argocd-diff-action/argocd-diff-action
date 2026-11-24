import { type App, type AppResourceStatus } from './argocd/App.js';

// `argocd app diff` prints every live object that carries the app's tracking ID
// and has no manifest as a full deletion. That includes objects the ArgoCD
// controller deliberately leaves out of the app's sync state because their
// tracking ID was copied from another object and does not match them (see
// isSelfReferencedObj in argo-cd's controller/state.go, argoproj/argo-cd#8683).
// The classic case is a Crossplane composite inheriting its claim's
// annotations: ArgoCD never prunes it and reports the app Synced, but the CLI
// diff shows it as removed on every run.
//
// stripUntrackedResources drops those sections from a diff. A section is
// dropped only when ArgoCD lists the object with no sync status, does not mark
// it for pruning, it is not a hook, and the section is a whole-object deletion.

// Matches the header `argocd app diff` prints per resource:
// `===== <group>/<kind> <namespace>/<name> ======` (group and namespace may be empty).
const SECTION_HEADER = /^={5,} (\S*)\/(\S+) (\S*)\/(\S+) ={5,}$/;
const SECTION_SPLIT = /(?=^={5,} .+ ={5,}$)/m;

// A whole-object deletion is a single `N,Md0` hunk (or `Nd0` for one line).
const FULL_DELETION_HUNK = /^\d+(,\d+)?d0$/;

function resourceKey(group: string, kind: string, namespace: string, name: string): string {
    return `${group}/${kind}/${namespace}/${name}`;
}

function untrackedResourceKeys(resources: AppResourceStatus[]): Set<string> {
    const keys = new Set<string>();
    for (const r of resources) {
        if (r.status === undefined && !r.hook && !r.requiresPruning) {
            keys.add(resourceKey(r.group ?? '', r.kind, r.namespace ?? '', r.name));
        }
    }
    return keys;
}

function isFullDeletion(body: string): boolean {
    const lines = body.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) {
        return false;
    }
    const [hunk = '', ...rest] = lines;
    return FULL_DELETION_HUNK.test(hunk.trim()) && rest.every(line => line.startsWith('<'));
}

export interface StripResult {
    diff: string;
    stripped: string[];
}

export function stripUntrackedResources(diff: string, app: App): StripResult {
    const untracked = untrackedResourceKeys(app.status?.resources ?? []);
    if (untracked.size === 0 || diff === '') {
        return { diff, stripped: [] };
    }

    const stripped: string[] = [];
    const kept = diff.split(SECTION_SPLIT).filter((section) => {
        const [header = '', ...bodyLines] = section.split('\n');
        const match = SECTION_HEADER.exec(header.trim());
        if (!match) {
            return true;
        }
        const [, group = '', kind = '', namespace = '', name = ''] = match;
        if (untracked.has(resourceKey(group, kind, namespace, name)) && isFullDeletion(bodyLines.join('\n'))) {
            stripped.push(header.trim());
            return false;
        }
        return true;
    });

    if (stripped.length === 0) {
        return { diff, stripped };
    }

    const result = kept.join('');
    // An app whose only diff was untracked objects has no diff at all.
    return { diff: result.trim() === '' ? '' : result, stripped };
}
