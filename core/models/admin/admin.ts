import { FileItem } from './files';
import { BlogPreviewItem } from '../blog';
import { SlideItem } from './slider';
import { BioData } from './bio';
import { PhotoItem } from './photos';
import { YoutubeItem } from '../youtube';
import { UserModel } from './user';

export type AdminState = {
  bio: BioData;
  users: {
    list: UserModel[];
    selectedUser: UserModel;
  };
  files: {
    list: FileItem[];
    selectedFile: FileItem | null;
    uploadingFile: boolean;
  };
  lists: {
    blogs: BlogPreviewItem[];
    slides: SlideItem[];
    photos: PhotoItem[];
    youtubes: YoutubeItem[];
  };
};
