#!/usr/bin/env node
// Rewrites the ArgoCD version matrix in .github/workflows/e2e.yml to the latest
// patch of the N most-recent stable minors (N = however many are pinned today).
// Patch bumps happen in place; a new minor or major slides the window (adds the
// newest, drops the oldest). The newest pin always carries comment-on-pr: true.
//
// Run locally:  GH_TOKEN=$(gh auth token) node __tests__/e2e/update-argocd-versions.mjs
// In CI the workflow passes the result via GITHUB_OUTPUT / GITHUB_STEP_SUMMARY.

import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const REPO = 'argoproj/argo-cd';
const WORKFLOW_PATH = '.github/workflows/e2e.yml';
const MAX_PAGES = 5; // 500 releases — far more than enough to cover recent minors.

const stableSemver = /^v(\d+)\.(\d+)\.(\d+)$/;

async function fetchStableVersions() {
    const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const versions = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
        const url = `https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`;
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`GitHub API ${response.status} fetching ${url}: ${await response.text()}`);
        }
        const releases = await response.json();
        for (const release of releases) {
            if (release.draft || release.prerelease) continue;
            if (stableSemver.test(release.tag_name)) versions.push(release.tag_name);
        }
        if (releases.length < 100) break;
    }
    return versions;
}

function minorKey(version) {
    const [, major, minor] = version.match(stableSemver);
    return `${major}.${minor}`;
}

function compareVersions(a, b) {
    const [, aMaj, aMin, aPat] = a.match(stableSemver).map(Number);
    const [, bMaj, bMin, bPat] = b.match(stableSemver).map(Number);
    return aMaj - bMaj || aMin - bMin || aPat - bPat;
}

function compareMinorKeys(a, b) {
    const [aMaj, aMin] = a.split('.').map(Number);
    const [bMaj, bMin] = b.split('.').map(Number);
    return aMaj - bMaj || aMin - bMin;
}

// Latest patch of the N most-recent minors, sorted ascending to match the matrix.
function selectTargetVersions(versions, count) {
    const latestPerMinor = new Map();
    for (const version of versions) {
        const key = minorKey(version);
        const current = latestPerMinor.get(key);
        if (!current || compareVersions(version, current) > 0) latestPerMinor.set(key, version);
    }
    const recentMinors = [...latestPerMinor.keys()].sort(compareMinorKeys).slice(-count);
    return recentMinors.map(key => latestPerMinor.get(key)).sort(compareVersions);
}

function parseCurrentVersions(workflow) {
    const block = workflow.match(/argocd-version:\n((?:\s*-\s*v\d+\.\d+\.\d+\n)+)/);
    if (!block) throw new Error('Could not locate the argocd-version matrix list in the workflow.');
    return [...block[1].matchAll(/v\d+\.\d+\.\d+/g)].map(match => match[0]);
}

function classifyBump(oldVersions, newVersions) {
    if (oldVersions.join() === newVersions.join()) return 'none';
    const oldMinors = new Set(oldVersions.map(minorKey));
    const newMinors = newVersions.map(minorKey);
    if (newMinors.every(key => oldMinors.has(key)) && newMinors.length === oldMinors.size) {
        return 'patch';
    }
    const oldMaxMajor = Math.max(...oldVersions.map(v => Number(v.match(stableSemver)[1])));
    const newMaxMajor = Math.max(...newVersions.map(v => Number(v.match(stableSemver)[1])));
    return newMaxMajor > oldMaxMajor ? 'major' : 'minor';
}

function rewriteWorkflow(workflow, newVersions) {
    const indent = '          ';
    const listBody = newVersions.map(version => `${indent}- ${version}\n`).join('');
    const newest = newVersions[newVersions.length - 1];

    const withList = workflow.replace(
        /(argocd-version:\n)(?:\s*-\s*v\d+\.\d+\.\d+\n)+/,
        `$1${listBody}`,
    );
    const withInclude = withList.replace(
        /(- argocd-version: )v\d+\.\d+\.\d+/,
        `$1${newest}`,
    );
    return withInclude;
}

function emitOutputs(fields) {
    const outputPath = process.env.GITHUB_OUTPUT;
    if (!outputPath) return;
    const lines = Object.entries(fields).map(([key, value]) => `${key}=${value}`);
    appendFileSync(outputPath, lines.join('\n') + '\n');
}

const workflow = readFileSync(WORKFLOW_PATH, 'utf8');
const oldVersions = parseCurrentVersions(workflow);
const allVersions = await fetchStableVersions();
const newVersions = selectTargetVersions(allVersions, oldVersions.length);
const bumpType = classifyBump(oldVersions, newVersions);

const summary = `ArgoCD e2e versions: ${oldVersions.join(', ')} -> ${newVersions.join(', ')} (${bumpType})`;
console.log(summary);

if (bumpType === 'none') {
    emitOutputs({ changed: 'false', bump_type: 'none' });
    process.exit(0);
}

writeFileSync(WORKFLOW_PATH, rewriteWorkflow(workflow, newVersions));
emitOutputs({
    changed: 'true',
    bump_type: bumpType,
    old_versions: oldVersions.join(', '),
    new_versions: newVersions.join(', '),
});
if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### ${summary}\n`);
}
