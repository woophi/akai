import { Model } from './mongoModel';
import { Blog } from './blog';

export type Likes = Model<LikesModel>;

export type LikesModel = {
  blog: Blog;
};
export type LikesSaveModel = {
  blog: string;
};
