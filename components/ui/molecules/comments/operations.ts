import { getBlogComments, createComment } from 'core/operations';
import { store } from 'core/store';
import { NewComment } from 'core/models';
import { blogsActions } from 'core/reducers/blogs';

export const getComments = async (blogId: string) => {
  try {
    const comments = await getBlogComments(blogId);
    store.dispatch(blogsActions.setComments({ blogId, comments: comments ?? [] }));
  } catch (error) {
    console.error(error);
  }
};

export const newComment = (data: NewComment, blogId: string) => createComment(blogId, data);
