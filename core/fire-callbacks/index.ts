import { client } from 'core/callbacks';
import { callApi } from 'core/common';
import { getCommentById } from 'core/operations';
import { store } from 'core/store';
import { selectAllBlogs } from 'core/selectors';

client.welcome = () => {
  callApi('post', 'api/guest/visit');
};

client.upload_done = (fileName, fileId, url) => {
  console.warn(fileName, 'fileName', 'fileId', fileId);
  if (fileId) {
    const file = {
      _id: fileId,
      name: fileName,
      url
    };
    store.dispatch({ type: 'UPDATE_FILES', payload: file });
    store.dispatch({ type: 'SELECT_FILE', payload: file });
  }
  store.dispatch({ type: 'UPLOADING_FILE', payload: false });
};

client.new_comment = async (commentId, blogId) => {
  const allBlogs = selectAllBlogs(store.getState());
  const blog = allBlogs.find(b => b.id == blogId);
  if (blog) {
    const comment = await getCommentById(commentId);
    if (comment) {
      store.dispatch({
        type: 'UPDATE_COMMENTS',
        payload: { blogId, comments: [...blog.comments, comment] }
      });
    }
  }
};
