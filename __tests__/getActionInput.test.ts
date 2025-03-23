import * as core from '@actions/core';
import { expect, test } from '@jest/globals';
import { when } from 'jest-when';
import getActionInput from '../src/getActionInput';

jest.mock('@actions/core')

describe('getActionInput', () => {
  const mockedGetInput = core.getInput as jest.MockedFunction<typeof core.getInput>;

  beforeEach(() => {
    // Set up the required fields
    when(mockedGetInput).calledWith('argocd-server-fqdn').mockReturnValue('argocd.example');
    when(mockedGetInput).calledWith('argocd-token').mockReturnValue('fakeArgoCdToken');
    when(mockedGetInput).calledWith('github-token').mockReturnValue('fakeGithubToken');
    // Set up the fields with default values
    when(mockedGetInput).calledWith('argocd-server-tls').mockReturnValue('true');
    when(mockedGetInput).calledWith('argocd-extra-cli-args').mockReturnValue('--grpc-web');
    // Set up remaining fields with empty values
    when(mockedGetInput).calledWith('argocd-version').mockReturnValue('');
    when(mockedGetInput).calledWith('argocd-exclude-paths').mockReturnValue('');
    when(mockedGetInput).calledWith('argocd-headers').mockReturnValue('');
  });

  test('getActionInput should return ActionInput with required and default values', () => {
    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [''],
        extraCliArgs: '--grpc-web',
        fqdn: 'argocd.example',
        protocol: 'https',
        token: 'fakeArgoCdToken',
        uri: 'https://argocd.example',
        cliVersion: '',
        headers: {},
      },
      githubToken: 'fakeGithubToken',
    });
  });

  test('getActionInput should return ActionInput with http protocol when specified', () => {
    when(mockedGetInput).calledWith('argocd-server-tls').mockReturnValue('false');

    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [''],
        extraCliArgs: '--grpc-web --plaintext',
        fqdn: 'argocd.example',
        protocol: 'http',
        token: 'fakeArgoCdToken',
        uri: 'http://argocd.example',
        cliVersion: '',
        headers: {},
      },
      githubToken: 'fakeGithubToken',
    });
  });

  test('getActionInput should return ActionInput with extra CLI arguments when specified', () => {
    when(mockedGetInput).calledWith('argocd-extra-cli-args').mockReturnValue('--core');

    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [''],
        extraCliArgs: '--core',
        fqdn: 'argocd.example',
        protocol: 'https',
        token: 'fakeArgoCdToken',
        uri: 'https://argocd.example',
        cliVersion: '',
        headers: {},
      },
      githubToken: 'fakeGithubToken',
    });
  });

  test('getActionInput should return ActionInput with ?? when specified', () => {
    when(mockedGetInput).calledWith('argocd-version').mockReturnValue('1.0.0');

    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [''],
        extraCliArgs: '--grpc-web',
        fqdn: 'argocd.example',
        protocol: 'https',
        token: 'fakeArgoCdToken',
        uri: 'https://argocd.example',
        cliVersion: '1.0.0',
        headers: {},
      },
      githubToken: 'fakeGithubToken',
    });
  });

  test('getActionInput should return ActionInput with exclude paths when specified', () => {
    when(mockedGetInput).calledWith('argocd-exclude-paths').mockReturnValue('path/to/exclude,path/to/also/exclude');

    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [
          'path/to/exclude',
          'path/to/also/exclude',
        ],
        extraCliArgs: '--grpc-web',
        fqdn: 'argocd.example',
        protocol: 'https',
        token: 'fakeArgoCdToken',
        uri: 'https://argocd.example',
        cliVersion: '',
        headers: {},
      },
      githubToken: 'fakeGithubToken',
    });
  });

  test('getActionInput should return ActionInput with headers when specified', () => {
    when(mockedGetInput).calledWith('argocd-headers').mockReturnValue('Authorization: Bearer xyz123,Content-Type: application/json');

    const result = getActionInput();
    expect(result).toEqual({
      arch: 'linux',
      argocd: {
        excludePaths: [''],
        extraCliArgs: '--grpc-web',
        fqdn: 'argocd.example',
        protocol: 'https',
        token: 'fakeArgoCdToken',
        uri: 'https://argocd.example',
        cliVersion: '',
        headers: {
          "Authorization": "Bearer xyz123",
          "Content-Type": "application/json",
        }
      },
      githubToken: 'fakeGithubToken',
    });
  });
});
