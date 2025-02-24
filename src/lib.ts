// lib.ts - utility functions
import { exec, type ExecException, type ExecOptions } from 'child_process';

export interface ExecResult {
  err?: Error;
  stdout: string;
  stderr: string;
}

export async function execCommand(command: string, options: ExecOptions = {}): Promise<ExecResult> {
  return new Promise<ExecResult>(async (done, failed) => {
    exec(command, options, (err: ExecException | null, stdout: string, stderr: string): void => {
      const res: ExecResult = {
        stdout,
        stderr
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

export function scrubSecrets(input: string): string {
  let output = input;
  // Match argocd `--auth-token` flag used when logging in. Used to scrub this
  // from the PR comment body.
  const authTokenMatches = input.match(/--auth-token=((\w+\S)+)/);
  if (authTokenMatches) {
    output = output.replace(new RegExp(authTokenMatches[1] ?? 'undefined', 'g'), '***');
  }
  return output;
}
