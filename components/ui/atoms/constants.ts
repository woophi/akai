import { CSSProperties } from 'react';
import { goToSpecific } from 'core/common';

export const styleTruncate: CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const toAlbums = () => goToSpecific('/admin/albums');
export const toBlogs = () => goToSpecific('/admin/blogs');
export const toShop = () => goToSpecific('/admin/shop');
export const toOrders = () => goToSpecific('/admin/orders');
export const toSlider = () => goToSpecific('/admin/slider');
export const toBio = () => goToSpecific('/admin/bio');
export const toPhotos = () => goToSpecific('/admin/photos');
export const toBans = () => goToSpecific('/admin/bans');
export const toYoutube = () => goToSpecific('/admin/youtube');
export const toComments = () => goToSpecific('/admin/comments');
export const toFacebook = () => goToSpecific('/admin/facebook');
export const toInstagram = () => goToSpecific('/admin/instagram');
export const toFollowers = () => goToSpecific('/admin/followers');
export const toUsers = () => goToSpecific('/admin/users');
export const toTT = () => goToSpecific('/admin/terms-and-conditions');
export const toAdmin = () => goToSpecific('/admin');
export const toHome = () => goToSpecific('/');
