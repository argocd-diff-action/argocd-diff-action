import { expect, test } from '@jest/globals';

import { execCommand, ExecResult, scrubSecrets } from '../src/lib';

test('scrubSecrets replaces auth-token with ***', () => {
  let fakeAuthToken =
    'eyJhbGciOiJIUzI1sdYfInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJyYXRlaHViLWs4cy1naXRodWItYWN0aW9uczphcGlLZXkiLCJuYmYiOjE2NTkwMjI3MzksImlhdCI6MTY1OTAyMjczOSwianRpIjoiNzFhMzgwYzktNzZlNi00ZmFiLWIzYzEtY2U5ZWY0YjFjYTE2In0.xT46ecH0T26iJGJJTbv6Knl-6B1F85_jYPe3OaGWb1c';
  let input = '/bin/argocd --grpc-web  --server=https://argocd.exmaple/ --auth-token=';
  let appendedFlag = ' --appended-flag=server.com';
  expect(scrubSecrets(input + fakeAuthToken + appendedFlag)).toBe(input + '***' + appendedFlag);
});

test('execCommand returns ExecResult', async () => {
  let result: ExecResult = { stdout: 'hello world\n', stderr: '' };
  await expect(execCommand('echo "hello world"')).resolves.toStrictEqual(result);
});

test('execCommand returns an err on failure', async () => {
  await expect(execCommand('badBinary')).rejects.toMatchObject({
    stdout: '',
    stderr: '/bin/sh: badBinary: command not found\n'
  });
});
