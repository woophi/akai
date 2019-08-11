import { Model } from './mongoModel';
import { Visitor } from './visitor';

export type Subscribers = Model<SubscribersModel>;

export type SubscribersModel = {
  email: string;
  visitor: Visitor;
  active: boolean;
};
export type SubscribersSaveModel = {
  visitor: string;
  email: string;
  active: boolean;
};
