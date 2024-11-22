import { Field, ObjectType } from 'type-graphql';
import { User } from './user.type';
import { LoginModel } from '@domain/model';


@ObjectType()
export class Login implements LoginModel {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
