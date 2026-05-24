import * as core from '@actions/core';
import { expect, jest, test } from '@jest/globals';
import getActionInput from '../src/getActionInput.js';

// @actions/core is auto-mocked (see __mocks__/@actions/core.js) because it is
// ESM-only and can't load under the CommonJS test runner, so getInput is a bare
// jest.fn(). Drive it directly to feed inputs into getActionInput. clearMocks is
// enabled in jest.config.ts, so each test sets its own implementation.
function mockInputs(inputs: Record<string, string>): void {
    jest.mocked(core.getInput).mockImplementation((name: string) => inputs[name] ?? '');
}

test('getActionInput parses inputs into an ActionInput', () => {
    mockInputs({
        'argocd-exclude-paths': 'foo,bar',
        'argocd-extra-cli-args': '--grpc-web',
        'argocd-headers': 'Authorization: Bearer token',
        'argocd-server-fqdn': 'argocd.example.com',
        'argocd-server-side-generate': 'false',
        'argocd-server-tls': 'true',
        'argocd-token': 'secret-token',
        'argocd-version': 'v2.5.0',
        'github-token': 'gh-token',
        'target-revisions': 'main,HEAD',
        'timezone': 'America/Toronto',
    });

    expect(getActionInput()).toStrictEqual({
        arch: 'linux',
        argocd: {
            cliVersion: 'v2.5.0',
            excludePaths: ['foo', 'bar'],
            extraCliArgs: '--grpc-web',
            fqdn: 'argocd.example.com',
            headers: new Map<string, string>([['Authorization', 'Bearer token']]),
            protocol: 'https',
            serverSideGenerate: false,
            targetRevisions: ['main', 'HEAD'],
            token: 'secret-token',
            uri: 'https://argocd.example.com',
        },
        githubToken: 'gh-token',
        timezone: 'America/Toronto',
    });
});

test('getActionInput sets serverSideGenerate when argocd-server-side-generate is "true"', () => {
    mockInputs({ 'argocd-server-side-generate': 'true' });

    expect(getActionInput().argocd.serverSideGenerate).toBe(true);
});

test('getActionInput uses http and appends --plaintext when argocd-server-tls is not "true"', () => {
    mockInputs({
        'argocd-extra-cli-args': '--grpc-web',
        'argocd-server-fqdn': 'argocd.example.com',
        'argocd-server-tls': 'false',
    });

    const actionInput = getActionInput();

    expect(actionInput.argocd.protocol).toBe('http');
    expect(actionInput.argocd.uri).toBe('http://argocd.example.com');
    expect(actionInput.argocd.extraCliArgs).toBe('--grpc-web --plaintext');
});
