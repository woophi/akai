import { callUserApi } from 'core/common';
import { YoutubeItem } from 'core/models';
import { store } from 'core/store';
import { getYoutubes } from 'core/operations';
import { adminListsActions } from 'core/reducers/admin';

export const getAllYoutubes = async () => {
  try {
    const data = await getYoutubes();
    store.dispatch(adminListsActions.fetchYoutubes(data));
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updateYoutubes = (youtubes: YoutubeItem[]) =>
  callUserApi<void>('post', 'api/admin/update/youtubes', {
    youtubes: youtubes.map((y, i) => ({ ...y, ordinal: i })),
  });

export const createYoutube = (youtube: string, title: string) =>
  callUserApi<void>('post', 'api/admin/create/youtube', { url: youtube, title });
