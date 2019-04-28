import { client } from 'core/callbacks';
import { callApi } from 'core/common';

client.welcome = () => {
  callApi('post', '/api/guest/visit');
};
