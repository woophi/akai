import { Model } from './mongoModel';
import { VisitorModel } from './visitor';
import { BlogModel } from './blog';

type GeneralCommentModel = {
  text: string;
  deleted?: Date;
};

export type SaveCommentModel = GeneralCommentModel & {
  visitor: string;
  blog: string;
};

export type CommentModel = GeneralCommentModel & {
  visitor: VisitorModel;
  blog: BlogModel;
};

export type Comment = Model<CommentModel>;
