import { UserModel } from './user.model';

export interface LoginModel {
  user: UserModel;
  token: string;
}

export interface LoginInputModel {
  email: string;
  password: string;
  rememberMe?: boolean;
}
