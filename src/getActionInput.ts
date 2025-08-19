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
        targetRevisions: string[];
        token: string;
        uri: string;
    };
    githubToken: string;
    timezone: string;
}

export function parseHeaders(input: string): Map<string, string> {
    const headers = new Map<string, string>();

    for (const item of input.split(',')) {
        if (item.trim() === '') {
            continue;
        }

        let [header, value] = item.split(':').map(s => s.trim());

        if (!header || header === '') {
            throw new Error(`Header name cannot be empty: ${item}`);
        }

        if (!value || value === '') {
            throw new Error(`Header value cannot be empty: ${item}`);
        }

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
            excludePaths: core.getInput('argocd-exclude-paths')
                .split(',')
                .map(path => path.trim()),
            extraCliArgs,
            fqdn,
            headers: parseHeaders(core.getInput('argocd-headers')),
            protocol,
            targetRevisions: core.getInput('target-revisions')
                .split(',')
                .map(revision => revision.trim()),
            token: core.getInput('argocd-token'),
            uri: `${protocol}://${fqdn}`,
        },
        githubToken: core.getInput('github-token'),
        timezone: core.getInput('timezone'),
    };
}
