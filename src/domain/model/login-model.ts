import { Field, ObjectType } from 'type-graphql';
import { UserModel } from '../../api/graphql/modules/user/type/user-type';

@ObjectType()
export class LoginModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  token: string;
}
