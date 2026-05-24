import assert from 'node:assert/strict';

import { computeDiffs } from '../../src/computeDiffs.js';
import getActionInput from '../../src/getActionInput.js';

// End-to-end check: drive the real diff stage against a live ArgoCD server
// (installs the real CLI, calls the real REST API). The harness has synced the
// `e2e-app` baseline and bumped the working-copy manifest, so we expect a diff
// on the Deployment's replica count.
const APP_NAME = 'e2e-app';

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

async function main(): Promise<void> {
    const actionInput = getActionInput();
    const diffs = await computeDiffs(actionInput);

    if (diffs === null) {
        throw new Error('No Applications returned from ArgoCD — check the token and RBAC.');
    }
    console.log(`Computed ${diffs.length} diff(s): ${diffs.map(d => d.app.metadata.name).join(', ')}`);

    const appDiff = diffs.find(d => d.app.metadata.name === APP_NAME);
    assert.ok(appDiff, `Expected a diff for Application '${APP_NAME}'.`);
    assert.equal(appDiff.error, undefined, `Diff for '${APP_NAME}' errored: ${appDiff.error?.stderr}`);

    console.log(`Diff for '${APP_NAME}':\n${appDiff.diff}`);
    assert.match(appDiff.diff, /replicas/, 'Expected the replica-count change in the diff.');
    assert.match(appDiff.diff, /Deployment/, 'Expected the Deployment resource in the diff.');

    console.log('e2e diff assertions passed.');
}
