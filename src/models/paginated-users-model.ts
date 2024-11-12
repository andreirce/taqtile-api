import { Field, ObjectType } from 'type-graphql';
import { UserModel } from './user-model';

@ObjectType()
export class PaginatedUsersModel {
  @Field(() => [UserModel])
  users: UserModel[];

  @Field(() => Boolean)
  moreAfter: boolean;

  @Field(() => Boolean)
  moreBefore: boolean;
}
