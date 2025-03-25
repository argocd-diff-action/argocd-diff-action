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
        },
        githubToken: core.getInput('github-token'),
    };
}
