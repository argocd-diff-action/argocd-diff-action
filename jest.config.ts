const config: import('ts-jest').JestConfigWithTsJest = {
    preset: 'ts-jest',
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
    globals: {
        'ts-jest': {
            tsconfig: {
                // Temporary fix for 'SyntaxError: Cannot use import statement outside a module'
                module: 'ESNext',
            },
        },
    },
};

export default config;
