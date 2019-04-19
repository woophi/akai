import io from 'socket.io-client';
import { callApi } from 'core/common';

const socket = io(`http://localhost:${process.env.PORT || 3003}`);
socket.on('connect', () => { console.warn('client tyt');});
socket.on('disconnect', () => { console.warn('client dis'); });
socket.on('welcome', (data: any) => {
  callApi('post', '/api/guest/visit', null);
});
