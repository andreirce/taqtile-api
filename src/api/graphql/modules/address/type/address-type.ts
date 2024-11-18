import { Field, ObjectType } from 'type-graphql';
import { AddressModel } from '../../../../../domain/model/address-model';

@ObjectType()
export class Address implements AddressModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  cep: string;

  @Field(() => String)
  street: string;

  @Field(() => Number)
  streetNumber: number;

  @Field(() => String, { nullable: true })
  complement: string;

  @Field(() => String)
  neighborhood: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  userId: string;
}
