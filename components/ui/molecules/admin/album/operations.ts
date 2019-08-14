import { callAdminApi } from 'core/common';
import { NewAlbumData, AlbumData } from 'core/models';

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

export const deleteAlbum = (albumId: string) =>
  callAdminApi<void>('delete', `api/admin/delete/album?id=${albumId}`);
