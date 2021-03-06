import { callAdminApi } from 'core/common';
import { YoutubeItem } from 'core/models';
import { store } from 'core/store';
import { getYoutubes } from 'core/operations';

export const getAllYoutubes = async () => {
  try {
    const data = await getYoutubes();
    store.dispatch({ type: 'FETCH_YOUTUBE', payload: data });
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updateYoutubes = (youtubes: YoutubeItem[]) =>
  callAdminApi<void>('post', 'api/admin/update/youtubes', {
    youtubes: youtubes.map((y, i) => ({ ...y, ordinal: i }))
  });

export const createYoutube = (youtube: string, title: string) =>
  callAdminApi<void>('post', 'api/admin/create/youtube', { url: youtube, title });
