import { client } from 'core/callbacks';
import { getCommentById } from 'core/operations';
import { adminActions } from 'core/reducers/admin';
import { blogsActions } from 'core/reducers/blogs';
import { selectAllBlogs } from 'core/selectors';
import { store } from 'core/store';

client.upload_done = (fileName, fileId, url) => {
  console.warn(fileName, 'fileName', 'fileId', fileId);
  if (fileId) {
    const file = {
      _id: fileId,
      name: fileName,
      url,
    };
    store.dispatch(adminActions.updateFiles(file));
    store.dispatch(adminActions.selectFile(file));
  }
  store.dispatch(adminActions.uploadingFile(false));
};

client.new_comment = async (commentId, blogId) => {
  const allBlogs = selectAllBlogs(store.getState());
  const blog = allBlogs[blogId];
  if (blog) {
    const comment = await getCommentById(commentId);
    if (comment) {
      store.dispatch(blogsActions.setComments({ blogId, comments: [...blog, comment] }));
    }
  }
};
