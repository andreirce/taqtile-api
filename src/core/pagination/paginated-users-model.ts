import { Field, ObjectType } from 'type-graphql';
import { UserModel } from '../../api/graphql/modules/user/type/user-type';

@ObjectType()
export class PaginatedUsersModel {
  @Field(() => [UserModel])
  users: UserModel[];

  @Field(() => Boolean)
  moreAfter: boolean;

  @Field(() => Boolean)
  moreBefore: boolean;
}
