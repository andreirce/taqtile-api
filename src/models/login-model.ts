import { Field, ObjectType } from 'type-graphql';
import { UserModel } from './user-model';

@ObjectType()
export class LoginModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  token: string;
}
