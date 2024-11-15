import { Response } from 'express';
import { RequestWithUser } from './request-with-user-model';

export interface ExpressContext {
  req: RequestWithUser;
  res: Response;
}
