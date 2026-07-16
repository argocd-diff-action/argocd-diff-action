import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        clearMocks: true,
        environment: 'node',
        include: ['__tests__/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            reporter: ['text', 'json', 'json-summary'],
            reportOnFailure: true,
        },
    },
});
