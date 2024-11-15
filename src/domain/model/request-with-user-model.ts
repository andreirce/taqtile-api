import { Request } from 'express';
import { User } from './user-model';

export interface RequestWithUser extends Request {
  user: User;
}
