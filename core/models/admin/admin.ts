import { FileItem } from './files';
import { BlogPreviewItem } from '../blog';
import { SlideItem } from './slider';

export type AdminState = {
  section: Section;
  files: FileItem[];
  selectedFile: FileItem;
  uploadingFile: boolean;
  blogs: BlogPreviewItem[];
  slides: SlideItem[]
};

export enum Section {
  Albums = 'Albums',
  Blogs = 'Blogs',
  Files = 'Files',
  Slider = 'Slider',
  Bio = 'Bio',
  Photos = 'Photos',
  BlackList = 'BlackList',
  Youtube = 'Youtube',
  Comments = 'Comments',
  Facebook = 'Facebook',
  Likes = 'Likes',
  Sketch = 'Sketch',
  Followers = 'Followers',
  Users = 'Users'
}
