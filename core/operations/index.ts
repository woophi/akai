import { client } from 'core/callbacks';
import { callApi } from 'core/common';

client.welcome = () => {
  callApi('post', '/api/guest/visit');
};
export const zaeb = () => console.warn('ZAEB INIT');
