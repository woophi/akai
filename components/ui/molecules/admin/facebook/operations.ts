import { callUserApi } from 'core/common';
import { store } from 'core/store';

export const getFacebookPageIds = () => callUserApi<number[]>('get', 'api/admin/fb/pages');

export const checkTokenValidation = async (pageId: number) => {
  const { valid } = await callUserApi<{ valid: boolean }>('patch', 'api/admin/fb/check/token', {
    pageId,
  });
  store.dispatch({ type: 'UPDATE_FACEBOOK_ACTIVE', payload: valid });
  return valid;
};

export const checkFBOnePage = async () => {
  const pageIds = await getFacebookPageIds();
  if (pageIds.length === 1) {
    await checkTokenValidation(pageIds[0]);
  }
};
