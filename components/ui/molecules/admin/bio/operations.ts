import { callUserApi } from 'core/common';
import { BioData, LocaleId, SaveBioModel } from 'core/models';
import { adminBioActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getBio = async () => {
  try {
    const data = await callUserApi<BioData>('get', 'api/admin/get/bio');
    store.dispatch(adminBioActions.fetchBio(data));
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updateBio = (data: BioData) => {
  const bioPayload: SaveBioModel = {
    bio: [
      {
        content: data.bioCs,
        localeId: LocaleId.Cs,
      },
      {
        content: data.bioEn,
        localeId: LocaleId.En,
      },
      {
        content: data.bioRu,
        localeId: LocaleId.Ru,
      },
    ],
    photoId: data.photoId,
    id: data.id,
  };
  return callUserApi<void>('post', 'api/admin/update/bio', bioPayload);
};
