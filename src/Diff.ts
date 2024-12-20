import { type App } from './argocd/App.js';
import { type ExecResult } from './lib.js';

export interface Diff {
  app: App;
  diff: string;
  error?: ExecResult;
}
