import { Model } from './mongoModel';
import { CommentModel } from './comment';

export type VisitInfo = {
  device?: object;
  language: string;
  city?: string;
  country?: string;
  browser?: object;
  os?: object;
  ip: string;
};

export type VisitorModel = {
  visitorId: string;
  uniqVisits: number;
  lastVisit: string;
  visitInfo: VisitInfo;
  comments?: CommentModel[];
};

export type Visitor = Model<VisitorModel>;
