import { Model } from './mongoModel';

export type Ban = Model<BanModel>;

export type BanModel = {
  reason: string;
  ip: string;
  level: BanLevel;
};
export type BanSaveModel = {
  reason: string;
  ip: string;
  level: BanLevel;
};

export enum BanLevel {
  COMMENT = 'comment',
  REQUEST = 'request',
  ALL = 'all',
}
