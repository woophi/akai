import { callAdminApi } from 'core/common';
import { SlideItem, PhotoItem } from 'core/models';
import { store } from 'core/store';

export const getAllPhotos = async () => {
  try {
    const data = await callAdminApi<PhotoItem[]>('get', 'api/admin/get/photos');
    store.dispatch({ type: 'FETCH_PHOTOS', payload: data });
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updatePhotos = (photos: PhotoItem[]) => {
  const mapPhotos = photos.map((p, index) => ({
    id: p.id,
    ordinal: index,
    fileId: p.file._id
  }));
  return callAdminApi<void>('post', 'api/admin/update/photos', { photos: mapPhotos });
};
