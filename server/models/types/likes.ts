import { Model } from './mongoModel';
import { Visitor } from './visitor';
import { Blog } from './blog';

export type Likes = Model<LikesModel>;

export type LikesModel = {
  visitor: Visitor;
  blog: Blog
}
export type LikesSaveModel = {
  visitor: string;
  blog: string;
}
