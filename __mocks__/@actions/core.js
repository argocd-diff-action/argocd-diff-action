// Manual mock for @actions/core.
//
// @actions/core v3+ is ESM-only (no CommonJS `require` export), and the jest
// suite transpiles to CommonJS via ts-jest. Loading the real package would
// fail to resolve under `require`. The action only uses @actions/core for
// logging/inputs, none of which the tests assert on, so a no-op mock is
// sufficient and keeps the ESM-only dependency chain out of the test runner.
//
// Jest applies manual mocks for node modules automatically (see
// https://jestjs.io/docs/manual-mocks#mocking-node-modules), so no explicit
// jest.mock('@actions/core') call is required.
module.exports = {
  debug: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
  setFailed: jest.fn(),
  getInput: jest.fn(),
};
