import { Field, ObjectType } from 'type-graphql';
import { AddressModel } from '../../../../../domain/model/address-model';

//Extends de user model e vai se chamar user, user model será uma inteface
@ObjectType()
export class UserModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date, { nullable: true })
  birthDate: Date;

  @Field(() => [AddressModel], { nullable: true })
  address: AddressModel[];
}
