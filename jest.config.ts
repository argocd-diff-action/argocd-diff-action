import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest';

const preset = createDefaultPreset({
    tsconfig: {
        // Temporary fix for 'SyntaxError: Cannot use import statement outside a module'
        module: 'ESNext',
    },
});

const config: JestConfigWithTsJest = {
    ...preset,
    clearMocks: true,
    moduleDirectories: ['node_modules', '<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^(\\./.+|\\../.+).js$': '$1',
    },
    moduleFileExtensions: ['js', 'ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
    testMatch: ['**/*.test.ts'],
    testRunner: 'jest-circus/runner',
    verbose: true,
};

export default config;
