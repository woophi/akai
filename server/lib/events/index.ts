import * as events from 'events';

class ClientCallbackClass extends events.EventEmitter {
  constructor() {
    super();
  }
}

export const ClientCallback = new ClientCallbackClass();
