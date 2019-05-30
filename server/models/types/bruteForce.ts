import { Model } from './mongoModel';

export type BruteForce = Model<BruteForceModel>;

export type BruteForceModel = {
  requestId: string;
  data: {
    count: number;
    lastRequest: Date;
    firstRequest: Date;
  },
  expires: Date
}





