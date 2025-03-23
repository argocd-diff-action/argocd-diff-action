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
  const mask = '***';
  let output = input;
  // Match argocd `--auth-token` flag used when logging in. Used to scrub this
  // from the PR comment body.
  const authTokenMatches = input.match(/--auth-token=((\w+\S)+)/);
  if (authTokenMatches) {
    output = output.replace(new RegExp(authTokenMatches[1] ?? 'undefined', 'g'), mask);
  }

  // Scrub all header values from the input string.
  const headerPattern = new RegExp('--header\\s+"(?<name>[\\w-]+):\\s*(?<value>[^"]*)"', 'g');
  const headerMatches = [...input.matchAll(headerPattern)]
  for (const match of headerMatches) {
    const value = match.groups?.value;
    if (value) {
      output = output.replace(value, mask);
    }
  }

  return output;
}
