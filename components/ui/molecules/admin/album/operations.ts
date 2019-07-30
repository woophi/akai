import { store } from 'core/store';
import { callAdminApi } from 'core/common';
import { BlogPreviewItem, NewAlbumData, AlbumData } from 'core/models';

export const getAllBlogs = async () => {
  try {
    const data = await callAdminApi<BlogPreviewItem[]>('get', 'api/admin/blogs');
    store.dispatch({ type: 'FETCH_BLOGS', payload: data });
    return data;
  } catch (error) {
    throw error.error;
  }
};

export const createNewAlbum = (data: NewAlbumData) => {
  const body = {
    coverPhotoId: data.coverPhotoId,
    blogs: data.blogs,
    title: [
      {
        localeId: 'en',
        content: data.nameEn
      },
      {
        localeId: 'ru',
        content: data.nameRu
      },
      {
        localeId: 'cs',
        content: data.nameCs
      }
    ]
  };
  return callAdminApi<string>('post', 'api/admin/new/album', body);
};

export const getAlbumData = (albumId: string) =>
  callAdminApi<AlbumData>('get', `api/admin/get/album?id=${albumId}`);

export const editAlbum = (albumId: string, data: AlbumData) => {
  const body = {
    coverPhotoId: data.coverPhotoId,
    blogs: data.blogs,
    title: [
      {
        localeId: 'en',
        content: data.nameEn
      },
      {
        localeId: 'ru',
        content: data.nameRu
      },
      {
        localeId: 'cs',
        content: data.nameCs
      }
    ]
  };
  callAdminApi<AlbumData>('put', `api/admin/edit/album?id=${albumId}`, body);
}
