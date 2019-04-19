import { Server } from 'http';
import * as socket from 'socket.io';
import { Logger } from '../../logger';

export const registerSocket = (server: Server) => {

  const io = socket(server);
  io.on('connection', socket => {
    Logger.info('User connected')

    socket.on('disconnect', () => {
      Logger.info('user disconnected')
    })
    socket.emit('welcome', { hello: 'world' });
  });
}
