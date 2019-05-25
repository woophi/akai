import { clientPerformCallback } from 'core/socket';

export const client = clientPerformCallback(m => ({
  welcome: m<() => void>(),
  upload_done: m<(fileName: string, fileId?: string) => void>(),
}));
