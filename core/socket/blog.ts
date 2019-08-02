import io from 'socket.io-client';
import getConfig from 'next/config';
import { initCallbacks } from '.';
const {publicRuntimeConfig} = getConfig();
const {SITE_URL} = publicRuntimeConfig;

let socketBlogConnected = false;

let socketBlog: SocketIOClient.Socket;

export const connectSocketBlog = () => {
  if (socketBlogConnected) return;
  socketBlog = io(SITE_URL);
  socketBlog.on('connect', () => {
    console.debug('client socketBlog connected');
    initCallbacks(socketBlog);
    socketBlogConnected = true;
  });
}

export const joinRoom = (blogId: string) => {
  socketBlog.emit('joinRoom', blogId)
}
export const leaveRoom = (blogId: string) => {
  socketBlog.emit('leaveRoom', blogId)
}
