import { Server } from 'http';
import socket from 'socket.io';
import { Logger } from 'server/logger';
import * as cl from 'server/storage/cloudinary';
import * as ig from 'server/instagram';
import { EventBus, BusEvents } from '../events';
import * as storageTypes from 'server/storage/types';
import { NameSpaces, EmitEvents } from './types';
import { increaseBlogView } from 'server/controllers';

export const registerSocket = (server: Server) => {
  const IO = socket(server);
  Logger.debug('Storage register events');
  cl.registerCloudinaryEvents();
  ig.registerInstagramEvents();

  const nspBlogs = IO.of(NameSpaces.BLOGS);

  const newComment = (commentId: string, blogId: string) => {
    Logger.debug('emit comment', commentId, blogId);
    nspBlogs.to(blogId).emit(EmitEvents.new_comment, commentId, blogId);
  };

  EventBus.on(BusEvents.NEW_COMMENT, newComment);

  nspBlogs.on('connection', socket => {
    Logger.info('nspBlogs connected');

    socket.on('joinRoom', blogId => {
      socket.join(blogId);
      Logger.info('joined room ' + blogId);
      increaseBlogView(blogId);
    });

    socket.on('leaveRoom', blogId => {
      socket.leave(blogId);
      Logger.info('left room ' + blogId);
    });

    socket.on('disconnect', () => {
      Logger.info('nspBlogs disconnected');
      socket.leaveAll();
    });
  });

  const nspUniqGuest = IO.of(NameSpaces.UNIQ_GUEST);
  nspUniqGuest.on('connection', socket => {
    Logger.info('uniq-guest connected');
    socket.emit(EmitEvents.welcome);
    socket.on('disconnect', () => {
      Logger.info('uniq-guest disconnected');
    });
  });

  const nspAdmin = IO.of(NameSpaces.ADMIN);
  nspAdmin.on('connection', socket => {
    Logger.debug('admin connected ' + socket.id);
    const fileSuc = ({ fileName, fileId, url }: storageTypes.FileCompleteParams) => {
      socket.emit(EmitEvents.upload_done, fileName, fileId, url);
    };

    const fileErr = ({ fileName }: storageTypes.FileCompleteParams) => {
      socket.emit(EmitEvents.upload_done, fileName);
    };

    socket.on('disconnect', () => {
      Logger.info('admin disconnected');
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS,
        fileSuc
      );
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_ERROR,
        fileErr
      );
    });

    EventBus.on(storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS, fileSuc);
    EventBus.on(storageTypes.FStorageEvents.UPLOADED_FILE_ERROR, fileErr);
  });
};
