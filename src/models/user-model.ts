import { Field, ObjectType } from 'type-graphql';
import { AddressModel } from './address-model';

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
