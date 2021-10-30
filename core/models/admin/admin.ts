import { FileItem } from './files';
import { BlogPreviewItem } from '../blog';
import { SlideItem } from './slider';
import { BioData } from './bio';
import { PhotoItem } from './photos';
import { YoutubeItem } from '../youtube';

export type AdminState = {
  section: Section;
  files: FileItem[];
  selectedFile: FileItem | null;
  uploadingFile: boolean;
  blogs: BlogPreviewItem[];
  slides: SlideItem[];
  bio: BioData;
  photos: PhotoItem[];
  youtubes: YoutubeItem[];
  facebookActive: boolean;
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
  Users = 'Users',
}
