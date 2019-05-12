import io from 'socket.io-client';
import getConfig from 'next/config';
import { checkAuth } from 'core/operations';
const {publicRuntimeConfig} = getConfig();
const {SITE_URL} = publicRuntimeConfig;

const socket = io(SITE_URL);
socket.on('connect', () => {
  console.debug('client connected');
  initCallbacks();
  checkAuth()
});

socket.on('disconnect', () => console.debug('client disconnect'));

let clientCallbacks: { [name: string]: any } = {};

type CallbackMethod = <M>() => M;

export function clientPerformCallback<T>(perform: (c: CallbackMethod) => T): T {
  const callbacks = (clientCallbacks = clientCallbacks || {});

  const pr: any = perform((): any => null);

  Object.keys(pr).forEach(m => {
    callbacks[m] = pr[m]
  });

  return callbacks as T;
}

function initCallbacks() {
  Object.keys(clientCallbacks).forEach(m => {
    let subscribe: Function = socket['on'];

    subscribe.call(socket, m, function() {
      const cb = clientCallbacks[m];
      if (cb) {
        cb.apply(socket, arguments);
      }
    });
  });
}
