import { Model } from './mongoModel';
import { Visitor } from './visitor';

export type Likes = Model<LikesModel>;

export type LikesModel = {
  visitor: Visitor;
}
export type LikesSaveModel = {
  visitor: string;
}
