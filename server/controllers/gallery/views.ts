import { Logger } from 'server/logger';
import BlogModel from 'server/models/blog';

export const increaseBlogView = (blogId: string) => {
  BlogModel.findById(blogId)
    .where('deleted', undefined)
    .exec((err, blog) => {
      if (err) {
        Logger.error('increaseBlogView get error', err);
        return;
      }
      if (blog) {
        blog.set({ views: (blog.views || 0) + 1 }).save(err => {
          if (err) {
            Logger.error('increaseBlogView save error', err);
          }
        });
      }
    });
};
