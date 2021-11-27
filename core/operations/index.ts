import { callApi, callUserApi } from 'core/common';
import * as models from 'core/models';
import { youtubeActions } from 'core/reducers/youtube';
import { store } from 'core/store';

export const subscribe = (email: string) => callApi<models.ResultSubscribe>('post', 'api/guest/subscribe', { email });

export const getBio = (localeId: models.LocaleId) =>
  callApi<models.BioModel>('get', `api/guest/biography?localeId=${localeId}`);

export const sendMessage = (data: models.MessageModel) => callApi<void>('post', `api/guest/send/message`, data);

export const getYoutubes = () => callApi<models.YoutubeItem[]>('get', `api/guest/youtubes`);
export const getPhotos = () => callApi<models.PhotoData[]>('get', `api/guest/photos`);
export const getAllAlbums = (localeId: models.LocaleId) =>
  callApi<models.AlbumModel[]>('get', `api/guest/albums?localeId=${localeId}`);

export const getAlbumData = (albumId: string, localeId: models.LocaleId) =>
  callApi<models.BlogsModel>('get', `api/guest/album?id=${albumId}&localeId=${localeId}`);

export const getBlogData = (blogId: string, localeId: models.LocaleId) =>
  callApi<models.BlogModel>('get', `api/guest/blog?id=${blogId}&localeId=${localeId}`);

export const getBlogComments = (blogId: string) =>
  callApi<models.CommentItem[] | null>('get', `api/guest/comments/blog?id=${blogId}`);

export const createComment = (blogId: string, data: models.NewComment) =>
  callApi<boolean>('post', `api/guest/comments/new/blog?id=${blogId}`, data);

export const getCommentById = (commentId: string) =>
  callApi<models.CommentItem>('get', `api/guest/comments/comment?id=${commentId}`);

export const getUnsubLinkState = (uniqId: string) =>
  callApi<models.LinkState>('get', `api/guest/unsub/state?uniqId=${uniqId}`);

export const guestUnsub = (uniqId: string) => callApi<void>('put', 'api/guest/unsub', { uniqId });

export const getLastChatLiveStreamId = async () => {
  const chatId = await callApi<string>('get', `api/guest/youtube/live/chat`);
  store.dispatch(youtubeActions.setChatId(chatId));
};

export const saveChatLiveStreamId = (chatId: string) => callUserApi<void>('post', `api/admin/save/live/chat`, { chatId });

export const resetPassword = (email: string) => callApi<void>('post', 'api/guest/password/reset', { email });

export const updatePassword = (password: string, linkId: string) =>
  callApi<string>('patch', 'api/guest/password/update', { password, linkId });

export const getResetPassLinkState = (uniqId: string) =>
  callApi<models.LinkState>('get', `api/guest/unsub/state?uniqId=${uniqId}`);

export const getProductData = (productName: string, localeId: models.LocaleId) =>
  callApi<models.ProductData>('get', `api/guest/product?localeId=${localeId}&name=${encodeURI(productName)}`);

export const getCategoryData = (categoryName: string, localeId: models.LocaleId) =>
  callApi<models.CategoryData>('get', `api/guest/category?localeId=${localeId}&name=${encodeURI(categoryName)}`);
export const getShopRelatedData = (localeId: models.LocaleId) =>
  callApi<models.ShopRelatedData>('get', `api/guest/shop/related?localeId=${localeId}`);

export const getTermsAndConditions = (localeId: models.LocaleId) =>
  callApi<string>('get', `api/guest/t-and-c?localeId=${localeId}`);

export const createShopOrder = (data: models.CreateShopOrder) =>
  callApi<{ orderId: number }>('post', `api/guest/order`, data);
