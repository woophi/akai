import { Model } from './mongoModel';
import { LanguageContent } from './blog';
import { Files } from './files';

export type SketchBook = Model<SketchBookModel>

export type SketchBookModel = {
  name: LanguageContent[];
  content: Files[];
}

export type SketchBookSaveModel = {
  name: LanguageContent[];
  content: string[];
}
