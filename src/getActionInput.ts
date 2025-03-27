import * as core from '@actions/core';
import assert from 'node:assert/strict';

export interface ActionInput {
    arch: string;
    argocd: {
        cliVersion: string;
        excludePaths: string[];
        extraCliArgs: string;
        fqdn: string;
        headers: Map<string, string>;
        protocol: string;
        token: string;
        uri: string;
    };
    githubToken: string;
    timezone: string;
}

function parseHeaders(input: string): Map<string, string> {
    const headers = new Map<string, string>();

    for (const item of input.split(',')) {
        let [header, value] = item.split(':');

        assert(header);
        assert(value);

        header = header.trim();
        value = value.trim();

        assert.match(header, /.+/);
        assert.match(value, /.+/);

        headers.set(header, value);
    }

    return headers;
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
            cliVersion: core.getInput('argocd-version'),
            excludePaths: core.getInput('argocd-exclude-paths').split(','),
            extraCliArgs,
            fqdn,
            headers: parseHeaders(core.getInput('argocd-headers')),
            protocol,
            token: core.getInput('argocd-token'),
            uri: `${protocol}://${fqdn}`,
        },
        githubToken: core.getInput('github-token'),
        timezone: core.getInput('timezone'),
    };
}
