import { callApi } from 'core/common';
import * as models from 'core/models';

export const subscribe = (email: string) =>
  callApi<models.ResultSubscribe>('post', 'api/guest/subscribe', { email });

export const getBio = (localeId: models.LocaleIds) =>
  callApi<models.BioModel>('get', `api/guest/biography?localeId=${localeId}`);

export const sendMessage = (data: models.MessageModel) =>
  callApi<void>('post', `api/guest/send/message`, data);

export const getYoutubes = () =>
  callApi<models.YoutubeItem[]>('get', `api/guest/youtubes`);
export const getPhotos = () =>
  callApi<models.PhotoData[]>('get', `api/guest/photos`);
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

export const getVisitorName = () =>
  callApi<string>('get', `api/guest/name`);

export const getCommentById = (commentId: string) =>
  callApi<models.CommentItem>('get', `api/guest/comments/comment?id=${commentId}`);
