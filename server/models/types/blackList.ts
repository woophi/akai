import { Model } from './mongoModel';
import { Visitor } from './visitor';

export type Ban = Model<BanModel>;

export type BanModel = {
  visitor: Visitor;
  reason: string;
  ip: string;
  level: BanLevel
}
export type BanSaveModel = {
  visitor: string;
  reason: string;
  ip: string;
  level: BanLevel
}

export enum BanLevel {
  COMMENT = 'comment',
  REQUEST = 'request',
  ALL = 'all'
}
