import { LocaleMap } from '../locales';
import { FileItem } from './files';

export type SlideItem = {
  id: string;
  file: FileItem;
  ordinal: number;
  title?: LocaleMap;
  subTitle?: LocaleMap;
  button: {
    link: string | null;
    name?: LocaleMap;
  };
};
