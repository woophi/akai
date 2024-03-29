import { callUserApi } from 'core/common';
import { SlideItem } from 'core/models';
import { adminListsActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getAllSlides = async () => {
  try {
    const data = await callUserApi<SlideItem[]>('get', 'api/admin/get/slides');
    store.dispatch(adminListsActions.fetchSlides(data));
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
    title: s.title,
    subTitle: s.subTitle,
    button: s.button,
  }));
  return callUserApi<void>('post', 'api/admin/update/slides', { slides: mapSlides });
};
