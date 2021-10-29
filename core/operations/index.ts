import { callApi, callAdminApi } from 'core/common';
import * as models from 'core/models';
import { store } from 'core/store';

export const subscribe = (email: string) => callApi<models.ResultSubscribe>('post', 'api/guest/subscribe', { email });

export const getBio = (localeId: models.LocaleIds) =>
  callApi<models.BioModel>('get', `api/guest/biography?localeId=${localeId}`);

export const sendMessage = (data: models.MessageModel) => callApi<void>('post', `api/guest/send/message`, data);

export const getYoutubes = () => callApi<models.YoutubeItem[]>('get', `api/guest/youtubes`);
export const getPhotos = () => callApi<models.PhotoData[]>('get', `api/guest/photos`);
export const getAllAlbums = (localeId: models.LocaleIds) =>
  callApi<models.AlbumModel[]>('get', `api/guest/albums?localeId=${localeId}`);

export const getAlbumData = (albumId: string, localeId: models.LocaleIds) =>
  callApi<models.BlogsModel>('get', `api/guest/album?id=${albumId}&localeId=${localeId}`);

export const getBlogData = (blogId: string, localeId: models.LocaleIds) =>
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
  store.dispatch({ type: 'SET_CHAT_ID', payload: chatId });
};

export const saveChatLiveStreamId = (chatId: string) => callAdminApi<void>('post', `api/admin/save/live/chat`, { chatId });

export const resetPassword = (email: string) => callApi<void>('post', 'api/guest/password/reset', { email });

export const updatePassword = (password: string, linkId: string) =>
  callApi<string>('patch', 'api/guest/password/update', { password, linkId });

export const getResetPassLinkState = (uniqId: string) =>
  callApi<models.LinkState>('get', `api/guest/unsub/state?uniqId=${uniqId}`);
