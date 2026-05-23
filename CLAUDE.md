# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A GitHub Action (TypeScript, runs on `node20`) that, on a PR, finds every ArgoCD Application sourced from the current repo and posts the ArgoCD diff as a PR comment. Distributed as an action — consumers reference `argocd-diff-action/argocd-diff-action@v0`, so the committed build artifact *is* the product.

## Commands

```bash
nvm use                      # Node 20 (see .nvmrc)
pnpm i --frozen-lockfile     # install (pnpm is required; corepack)
pnpm run build               # bundle src/ -> dist/index.js via @vercel/ncc
pnpm run test                # jest --coverage
pnpm run lint                # eslint (lint:fix to autofix)

pnpm exec jest __tests__/argocd/ArgoCDServer.test.ts   # single test file
pnpm exec jest -t 'throws on 401'                       # single test by name
```

`test.sh` is a manual end-to-end smoke test that builds and runs `dist/index.js` against a real ArgoCD server using `INPUT_*` env vars — it is **not** part of `pnpm run test` and needs real credentials.

## The dist/ artifact is load-bearing

`action.yml` runs `dist/index.js`, not `src/`. `dist/index.js` is the ncc-bundled, **committed** output of `pnpm run build` — never hand-edit it. In normal flow you don't rebuild it yourself: the release workflow runs `pnpm run build` and `semantic-release` commits the regenerated `dist/**` as part of the release commit. If you change `src/` and want to test the bundle locally, run `pnpm run build`.

## Module system gotcha

Source is ESM (`"type": "module"`, `module: NodeNext`), so **relative imports must use `.js` extensions even though the files are `.ts`** (e.g. `import { ArgoCDServer } from './argocd/ArgoCDServer.js'`). Tests transpile to CommonJS via ts-jest (`jest.config.ts`), and `moduleNameMapper` rewrites those `.js` specifiers back — match the existing import style or both build and tests break.

## Execution flow (src/main.ts)

1. `getActionInput()` reads action inputs via `@actions/core` into a single `ActionInput` object. `argocd-server-tls=false` appends `--plaintext` to the CLI args and switches the API to `http`.
2. `ArgoCDServer.installArgoCDCommand()` downloads the `argocd` binary (defaults to the server's own version via the `version` API).
3. `getAppCollection()` fetches all Applications from the ArgoCD REST API.
4. The `AppCollection` is narrowed by a chain of pure filters: `filterByRepo` (matches `owner/repo` from the GitHub context) → `filterByTargetRevision` (the `target-revisions` "trunk" branches) → `filterByExcludedPath`.
5. For each remaining app, `argocd app diff --local=<path>` runs (`getAppCollectionLocalDiffs`).
6. **App-of-Apps:** if a diff contains a changed `argoproj.io/Application` with a new `targetRevision`, `getAppOfAppTargetRevisions()` parses it out and a second `argocd app diff --revision=<rev>` runs against the *full* collection. This catches the child app's manifest change but not e.g. Helm value changes.
7. `postDiffComment()` renders all diffs to markdown and upserts a single PR comment.

### Two diff modes, one important asymmetry

- **Local diff** runs only against apps that passed the repo/branch/path filters (`appLocalCollection`).
- **Revision diff** runs against `appAllCollection` (unfiltered) — child apps of an App-of-App may live outside the filtered set, so this must look them up by name across everything.

### PR comment is keyed by ArgoCD FQDN

Each comment body starts with a hidden marker `<!-- argocd-diff-action <fqdn> -->`. `postDiffComment` finds an existing comment by that marker and **updates it** (so re-runs don't stack comments), and only **creates** a new one when there are diffs. The FQDN in the marker means multiple ArgoCD servers each get their own comment on the same PR.

### Secret scrubbing

Anything posted to the PR goes through `scrubSecrets()` (src/lib.ts) first: it redacts the `--auth-token=` value and the values of sensitive headers (`Authorization`, `Proxy-Authorization`). When adding output paths, route them through this.

## Releases & commit convention

`semantic-release` (config in `.releaserc`) runs on push to `main` and drives versioning from **Angular Conventional Commits**. Commit type determines the bump — see the `releaseRules` in `.releaserc` (e.g. `feat` → minor, `fix`/`refactor`/`chore` → patch, `docs`/`ci`/`test` → no release; `build(deps-dev)` and `chore(release)` are skipped). Commit messages are enforced by commitlint (`commitlint.config.cjs`) via a pre-commit hook. Each release also force-updates the floating major tag (e.g. `v0`).

The README's input/output tables are auto-generated during release (`mdvorak/update-action-readme`) from `action.yml` — edit `action.yml`, not the table rows between the `<!--(inputs-start)-->` markers.
