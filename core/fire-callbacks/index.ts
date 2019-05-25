import { client } from 'core/callbacks';
import { callApi } from 'core/common';

client.welcome = () => {
  callApi('post', 'api/guest/visit');
};

client.upload_done = (fileName, fileId) => {
  console.warn(fileName, 'fileName', 'fileId', fileId);
};
