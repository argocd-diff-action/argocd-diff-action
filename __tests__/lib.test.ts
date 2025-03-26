import { expect, test } from '@jest/globals';

import { execCommand, type ExecResult, scrubSecrets } from '../src/lib.js';

test('scrubSecrets replaces auth-token with ***', () => {
    const fakeAuthToken = 'super-secret-auth-token';
    const input = '/bin/argocd --grpc-web  --server=https://argocd.exmaple/ --auth-token=';
    const appendedFlag = ' --appended-flag=server.com';
    expect(scrubSecrets(input + fakeAuthToken + appendedFlag)).toBe(input + '***' + appendedFlag);
});

test('scrubSecrets replaces double quoted authorization header value with ***', () => {
    const header = '--header "Authorization: Bearer super-secret-bearer-token"';
    const appendedFlag = '--appended-flag=server.com';
    const input = `/bin/argocd --grpc-web  --server=https://argocd.example/ ${header} ${appendedFlag}`;
    expect(scrubSecrets(input)).toContain('--header "Authorization: ***"');
});

test('scrubSecrets replaces singled quoted authorization header value with ***', () => {
    const header = '--header "Authorization: Bearer super-secret-bearer-token"';
    const appendedFlag = '--appended-flag=server.com';
    const input = `/bin/argocd --grpc-web  --server=https://argocd.example/ ${header} ${appendedFlag}`;
    expect(scrubSecrets(input)).toContain('--header "Authorization: ***"');
});

test('scrubSecrets replaces authorization header value with ***', () => {
    const header = '--header Authorization:scrub-me-please';
    const appendedFlag = '--appended-flag=server.com';
    const input = `/bin/argocd --grpc-web  --server=https://argocd.example/ ${header} ${appendedFlag}`;
    expect(scrubSecrets(input)).toContain('--header "Authorization: ***"');
});

test('execCommand returns ExecResult', async () => {
    const result: ExecResult = { stdout: 'hello world\n', stderr: '' };
    await expect(execCommand('echo "hello world"')).resolves.toStrictEqual(result);
});

test('execCommand returns an err on failure', async () => {
    await expect(execCommand('badBinary')).rejects.toMatchObject({
        stdout: '',
        stderr: '/bin/sh: 1: badBinary: not found\n',
    });
});
