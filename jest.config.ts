const config: import('ts-jest').JestConfigWithTsJest = {
  clearMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^(\\./.+|\\../.+).js$': '$1'
  },
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  verbose: true
};

export default config;
