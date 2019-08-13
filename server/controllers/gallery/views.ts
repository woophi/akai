import BlogModel from 'server/models/blog';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';

export const increaseBlogView = (blogId: string) => {
  BlogModel.findById(blogId).exec((err, blog: models.Blog) => {
    if (err) {
      Logger.error('increaseBlogView get error', err);
      return;
    }
    if (blog) {
      blog
        .set({ views: blog.views + 1 })
        .save(err => Logger.error('increaseBlogView save error', err));
    }
  });
};
