import { App } from './argocd/App';
import { ExecResult } from './lib';

export interface Diff {
  app: App;
  diff: string;
  error?: ExecResult;
}
