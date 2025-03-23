import * as core from '@actions/core';

export interface ActionInput {
  arch: string;
  githubToken: string;
  argocd: {
    excludePaths: string[];
    extraCliArgs: string;
    fqdn: string;
    protocol: string;
    token: string;
    uri: string;
    cliVersion: string;
    headers: Record<string, string>;
  };
}

export default function getActionInput(): ActionInput {
  const useTls = core.getInput('argocd-server-tls') === 'true';
  const fqdn = core.getInput('argocd-server-fqdn');
  const protocol = useTls ? 'https' : 'http';
  let extraCliArgs = core.getInput('argocd-extra-cli-args');

  if (!useTls) {
    extraCliArgs += ' --plaintext';
  }

  return {
    arch: process.env.ARCH || 'linux',
    argocd: {
      excludePaths: core.getInput('argocd-exclude-paths').split(','),
      extraCliArgs,
      fqdn,
      protocol,
      token: core.getInput('argocd-token'),
      uri: `${protocol}://${fqdn}`,
      cliVersion: core.getInput('argocd-version'),
      headers: toHeaders(core.getInput('argocd-headers'))
    },
    githubToken: core.getInput('github-token'),
  };
}

function toHeaders(headerString: string): Record<string, string> {
  if (!headerString) {
    return {};
  }
  
  return headerString
    .split(',')
    .reduce((acc: Record<string, string>, header: string) => {
      const [name, ...values] = header.split(':');
      if (name && values.length > 0) {
        acc[name.trim()] = values.join(':').trim();
      }
      return acc;
    }, {});
}