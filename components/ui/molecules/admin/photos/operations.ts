import { callAdminApi } from 'core/common';
import { PhotoItem } from 'core/models';
import { adminListsActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getAllPhotos = async () => {
  try {
    const data = await callAdminApi<PhotoItem[]>('get', 'api/admin/get/photos');
    store.dispatch(adminListsActions.fetchPhotos(data));
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updatePhotos = (photos: PhotoItem[]) => {
  const mapPhotos = photos.map((p, index) => ({
    id: p.id,
    ordinal: index,
    fileId: p.file._id,
  }));
  return callAdminApi<void>('post', 'api/admin/update/photos', { photos: mapPhotos });
};
