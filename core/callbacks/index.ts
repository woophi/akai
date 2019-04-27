import { clientPerformCallback } from 'core/socket';

export const client = clientPerformCallback(m => ({
  welcome: m<() => void>()
}));
