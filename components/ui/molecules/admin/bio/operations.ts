import { callAdminApi } from 'core/common';
import { BioData, LocaleId, SaveBioModel } from 'core/models';
import { adminActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getBio = async () => {
  try {
    const data = await callAdminApi<BioData>('get', 'api/admin/get/bio');
    store.dispatch(adminActions.fetchBio(data));
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
  return callAdminApi<void>('post', 'api/admin/update/bio', bioPayload);
};
