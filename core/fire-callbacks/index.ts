import { client } from 'core/callbacks';
import { callApi } from 'core/common';
import { getCommentById } from 'core/operations';
import { store } from 'core/store';

client.welcome = () => {
  callApi('post', 'api/guest/visit');
};

client.upload_done = (fileName, fileId) => {
  console.warn(fileName, 'fileName', 'fileId', fileId);
};

client.new_comment = async commentId => {
  console.warn('I fired new_comment');
  const comment = await getCommentById(commentId);
  if (comment) {
    const allComments = store.getState().ui.comments;
    store.dispatch({ type: 'UPDATE_COMMENTS', payload: [ ...allComments, comment] })
  }
}
