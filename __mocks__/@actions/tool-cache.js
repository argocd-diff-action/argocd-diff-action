// Manual mock for @actions/tool-cache.
//
// @actions/tool-cache v3+ is ESM-only (no CommonJS `require` export), and the
// jest suite transpiles to CommonJS via ts-jest. The tests already replace
// downloadTool with a jest mock, so a no-op manual mock keeps the real
// ESM-only package (and its dependency chain) out of the CommonJS test runner.
//
// Jest applies manual mocks for node modules automatically (see
// https://jestjs.io/docs/manual-mocks#mocking-node-modules).
module.exports = {
    downloadTool: jest.fn(),
};
