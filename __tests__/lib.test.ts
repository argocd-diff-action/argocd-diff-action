import { expect, test } from '@jest/globals';

import { execCommand, type ExecResult, scrubSecrets } from '../src/lib.js';

test('scrubSecrets replaces auth-token with ***', () => {
  let fakeAuthToken =
    'eyJhbGciOiJIUzI1sdYfInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJyYXRlaHViLWs4cy1naXRodWItYWN0aW9uczphcGlLZXkiLCJuYmYiOjE2NTkwMjI3MzksImlhdCI6MTY1OTAyMjczOSwianRpIjoiNzFhMzgwYzktNzZlNi00ZmFiLWIzYzEtY2U5ZWY0YjFjYTE2In0.xT46ecH0T26iJGJJTbv6Knl-6B1F85_jYPe3OaGWb1c';
  let input = '/bin/argocd --grpc-web  --server=https://argocd.exmaple/ --auth-token=';
  let appendedFlag = ' --appended-flag=server.com';
  expect(scrubSecrets(input + fakeAuthToken + appendedFlag)).toBe(input + '***' + appendedFlag);
});

test('scrubSecrets replaces header value with ***', () => {
  let header = '--header "Authorization: Bearer xyz123"';
  let input = '/bin/argocd --grpc-web  --server=https://argocd.example/ --auth-token=';
  let appendedFlag = '--appended-flag=server.com';
  const expectedHeader = '--header "Authorization: ***"';
  expect(scrubSecrets(`${input} ${header} ${appendedFlag}`)).toBe(`${input} ${expectedHeader} ${appendedFlag}`);
});

test('scrubSecrets replaces header values with ***', () => {
  let headers = '--header "Authorization: Bearer xyz123" --header "Content-Type: application/json"';
  let input = '/bin/argocd --grpc-web  --server=https://argocd.example/ --auth-token=';
  let appendedFlag = '--appended-flag=server.com';
  const expectedHeaders = '--header "Authorization: ***" --header "Content-Type: ***"';;
  expect(scrubSecrets(`${input} ${headers} ${appendedFlag}`)).toBe(`${input} ${expectedHeaders} ${appendedFlag}`);
});

test('scrubSecrets replaces auth-token and header values', () => {
  let fakeAuthToken =
    'eyJhbGciOiJIUzI1sdYfInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJyYXRlaHViLWs4cy1naXRodWItYWN0aW9uczphcGlLZXkiLCJuYmYiOjE2NTkwMjI3MzksImlhdCI6MTY1OTAyMjczOSwianRpIjoiNzFhMzgwYzktNzZlNi00ZmFiLWIzYzEtY2U5ZWY0YjFjYTE2In0.xT46ecH0T26iJGJJTbv6Knl-6B1F85_jYPe3OaGWb1c';
  let headers = '--header "Authorization: Bearer xyz123" --header "Content-Type: application/json"';
  let input = '/bin/argocd --grpc-web  --server=https://argocd.example/ --auth-token=';
  let appendedFlag = '--appended-flag=server.com';
  const expectedHeaders = '--header "Authorization: ***" --header "Content-Type: ***"';;
  expect(scrubSecrets(`${input}${fakeAuthToken} ${headers} ${appendedFlag}`)).toBe(`${input}*** ${expectedHeaders} ${appendedFlag}`);
});

test('execCommand returns ExecResult', async () => {
  let result: ExecResult = { stdout: 'hello world\n', stderr: '' };
  await expect(execCommand('echo "hello world"')).resolves.toStrictEqual(result);
});

test('execCommand returns an err on failure', async () => {
  await expect(execCommand('badBinary')).rejects.toMatchObject({
    stdout: '',
    stderr: '/bin/sh: 1: badBinary: not found\n'
  });
});
