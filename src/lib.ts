// lib.ts - utility functions
import { exec, type ExecException, type ExecOptions } from 'child_process';

const SENSITIVE_HEADERS = [
    'Authorization',
    'Proxy-Authorization',
];

export interface ExecResult {
    err?: Error;
    stdout: string;
    stderr: string;
}

// Large `argocd app diff` output overflows Node's default 1 MB stdout buffer
// and crashes with ERR_CHILD_PROCESS_STDIO_MAXBUFFER before any diff is posted.
const MAX_EXEC_BUFFER = 50 * 1024 * 1024;

export async function execCommand(command: string, options: ExecOptions = {}): Promise<ExecResult> {
    const execOptions: ExecOptions = { maxBuffer: MAX_EXEC_BUFFER, ...options };
    return new Promise<ExecResult>((done, failed) => {
        exec(command, execOptions, (err: ExecException | null, stdout: string | Buffer, stderr: string | Buffer): void => {
            const res: ExecResult = {
                stdout: stdout.toString(),
                stderr: stderr.toString(),
            };
            if (err) {
                res.err = err;
                failed(res);
                return;
            }
            done(res);
        });
    });
}

export function scrubSecrets(input: string, headers: Map<string, string>): string {
    let output = input;
    // Match argocd `--auth-token` flag used when logging in. Used to scrub this
    // from the PR comment body.
    const authTokenMatches = input.match(/--auth-token=((\w+\S)+)/);
    if (authTokenMatches && authTokenMatches[1]) {
        output = output.replace(new RegExp(authTokenMatches[1], 'g'), '***');
    }

    for (const header of SENSITIVE_HEADERS) {
        if (headers.has(header)) {
            output = output.replaceAll(`${header}: ${headers.get(header)}`, `${header}: ***`);
        }
    }

    return output;
}
