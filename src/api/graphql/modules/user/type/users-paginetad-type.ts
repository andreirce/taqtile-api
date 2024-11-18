import { Field, ObjectType } from 'type-graphql';
import { User } from './user-type';
import { PaginationModel } from '../../../../../core/pagination/pagination-model';

@ObjectType()
export class UsersPaginatedModel implements PaginationModel {
  @Field(() => [User])
  users: User[];

  @Field(() => Boolean)
  moreAfter: boolean;

  @Field(() => Boolean)
  moreBefore: boolean;
}
