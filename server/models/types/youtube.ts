import { Model } from './mongoModel';

export type Youtube = Model<YoutubeModel>

export type YoutubeModel = {
  videoId: string;
  title: string;
}
