import { client } from 'core/callbacks';
import { callApi } from 'core/common';
import { getCommentById } from 'core/operations';
import { store } from 'core/store';
import { selectAllBlogs } from 'core/selectors';

client.welcome = () => {
  callApi('post', 'api/guest/visit');
};

client.upload_done = (fileName, fileId) => {
  console.warn(fileName, 'fileName', 'fileId', fileId);
};

client.new_comment = async (commentId, blogId)=> {
  const allBlogs = selectAllBlogs(store.getState());
  const blog = allBlogs.find(b => b.id == blogId);
  if (blog) {
    const comment = await getCommentById(commentId);
    if (comment) {
      store.dispatch({ type: 'UPDATE_COMMENTS', payload: { blogId, comments: [...blog.comments, comment] } })
    }
  }
}
