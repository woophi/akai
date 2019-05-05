import { Model } from './mongoModel';

export type FacebookModel = {
  pageId: number;
  pageName: string;
  longLiveToken: string;
};

export type FacebookPage = Model<FacebookModel>;
