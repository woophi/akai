import { Response, Request } from 'express';
import { Storage } from '..';

export const startUpload = (req: Request, res: Response) => {
  const storage = new Storage(req.files ?? {}, 'process files');
  storage.performQueue();
  return res.sendStatus(204);
};
