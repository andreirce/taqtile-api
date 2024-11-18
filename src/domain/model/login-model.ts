import { UserModel } from './user-model';

export interface LoginModel {
  user: UserModel;
  token: string;
}
