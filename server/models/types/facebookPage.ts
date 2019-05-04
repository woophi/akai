import { Model } from './mongoModel';

export type FacebookPage = Model<{
  pageId: number;
  pageName: string;
  longLiveToken: string;
}>;
