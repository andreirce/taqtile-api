import { Response } from 'express';
import { RequestWithUser } from './request-with-user-interface';

export interface ExpressContext {
  req: RequestWithUser;
  res: Response;
}
