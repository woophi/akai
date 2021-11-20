import { callUserApi } from 'core/common';
import { BlogData, NewBlogData } from 'core/models';

export const createNewBlog = (data: NewBlogData) => {
  const body = {
    photos: data.photos,
    parameters: data.parameters,
    creationPictureDate: data.creationPictureDate,
    socialShare: data.socialShare,
    title: [
      {
        localeId: 'en',
        content: data.titleEn,
      },
      {
        localeId: 'ru',
        content: data.titleRu,
      },
      {
        localeId: 'cs',
        content: data.titleCs,
      },
    ],
    body: [
      {
        localeId: 'en',
        content: data.bodyEn,
      },
      {
        localeId: 'ru',
        content: data.bodyRu,
      },
      {
        localeId: 'cs',
        content: data.bodyCs,
      },
    ],
    topic: [
      {
        localeId: 'en',
        content: data.topicEn,
      },
      {
        localeId: 'ru',
        content: data.topicRu,
      },
      {
        localeId: 'cs',
        content: data.topicCs,
      },
    ],
    notifySubscribers: data.notifySubscribers,
    albumId: data.albumId,
  };
  return callUserApi<string>('post', 'api/admin/new/blog', body);
};
export const editBlog = (blogId: string, data: BlogData) => {
  const body = {
    photos: data.photos,
    parameters: data.parameters,
    creationPictureDate: data.creationPictureDate,
    socialShare: data.socialShare,
    title: [
      {
        localeId: 'en',
        content: data.titleEn,
      },
      {
        localeId: 'ru',
        content: data.titleRu,
      },
      {
        localeId: 'cs',
        content: data.titleCs,
      },
    ],
    body: [
      {
        localeId: 'en',
        content: data.bodyEn,
      },
      {
        localeId: 'ru',
        content: data.bodyRu,
      },
      {
        localeId: 'cs',
        content: data.bodyCs,
      },
    ],
    topic: [
      {
        localeId: 'en',
        content: data.topicEn,
      },
      {
        localeId: 'ru',
        content: data.topicRu,
      },
      {
        localeId: 'cs',
        content: data.topicCs,
      },
    ],
  };
  callUserApi<BlogData>('put', `api/admin/edit/blog?id=${blogId}`, body);
};

export const getBlogData = (blogId: string) => callUserApi<BlogData>('get', `api/admin/get/blog?id=${blogId}`);

export const deleteBlog = (blogId: string) => callUserApi<void>('delete', `api/admin/delete/blog?id=${blogId}`);
