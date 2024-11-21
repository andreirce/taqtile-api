import { Field, ObjectType } from 'type-graphql';
import { User } from './user-type';import { UsersPaginationModel } from '@domain/model';
;


@ObjectType()
export class UsersPaginated implements UsersPaginationModel {
  @Field(() => [User])
  users: User[];

  @Field(() => Boolean)
  moreAfter: boolean;

  @Field(() => Boolean)
  moreBefore: boolean;
}
