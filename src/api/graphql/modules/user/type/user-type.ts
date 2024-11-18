import { Field, ObjectType } from 'type-graphql';
import { UserModel } from '../../../../../domain/model/user-model';
import { Address } from '../../address/type/address-type';

//Extends de user model e vai se chamar user, user model será uma inteface
@ObjectType()
export class User implements UserModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date, { nullable: true })
  birthDate: Date;

  @Field(() => [Address], { nullable: true })
  address: Address[];
}
