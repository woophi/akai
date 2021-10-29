import { Model } from './mongoModel';

export type Subscribers = Model<SubscribersModel>;

export type SubscribersModel = {
  email: string;
  active: boolean;
};
export type SubscribersSaveModel = {
  email: string;
  active: boolean;
};
