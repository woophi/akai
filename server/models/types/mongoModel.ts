import { Document } from 'mongoose';

export type Model<T> = T & Document;
