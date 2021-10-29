import { callAdminApi } from 'core/common';
import { SlideItem } from 'core/models';
import { adminActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getAllSlides = async () => {
  try {
    const data = await callAdminApi<SlideItem[]>('get', 'api/admin/get/slides');
    store.dispatch(adminActions.fetchSlides(data));
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updateSlides = (slides: SlideItem[]) => {
  const mapSlides = slides.map((s, index) => ({
    id: s.id,
    ordinal: index,
    fileId: s.file._id,
  }));
  return callAdminApi<void>('post', 'api/admin/update/slides', { slides: mapSlides });
};
