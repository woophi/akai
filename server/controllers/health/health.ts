import { Request, Response } from 'express';

export function getApiHealth(req: Request, res: Response) {
  return res.json({ health: 'ok' });
}
