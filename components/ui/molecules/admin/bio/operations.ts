import { callAdminApi } from 'core/common';
import { BioData, SaveBioModel } from 'core/models';
import { store } from 'core/store';

export const getBio = async () => {
  try {
    const data = await callAdminApi<BioData>('get', 'api/admin/get/bio');
    store.dispatch({ type: 'FETCH_BIO', payload: data });
    return data;
  } catch (error) {
    throw error.error;
  }
};
export const updateBio = (data: BioData) => {
  const bioPayload: SaveBioModel = {
    bio: [{
      content: data.bioCs,
      localeId: 'cs'
    }, {
      content: data.bioEn,
      localeId: 'en'
    }, {
      content: data.bioRu,
      localeId: 'ru'
    }],
    photoId: data.photoId,
    id: data.id
  }
  return callAdminApi<void>('post', 'api/admin/update/bio', bioPayload);
};
