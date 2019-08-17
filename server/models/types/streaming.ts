import { Model } from './mongoModel';

export type Streaming = Model<StreamingModel>

export type StreamingModel = {
  chatId: string;
}
