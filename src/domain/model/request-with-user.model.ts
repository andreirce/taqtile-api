import { Request } from 'express';
import { UserModel } from './user.model';

export interface RequestWithUser extends Request {
  user: UserModel;
}
