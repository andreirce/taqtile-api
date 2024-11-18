import { UserModel } from '../../domain/model/user-model';

export interface PaginationModel {
  users: UserModel[];
  moreAfter: boolean;
  moreBefore: boolean;
}
