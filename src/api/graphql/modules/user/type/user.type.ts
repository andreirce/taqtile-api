import { UserModel } from '@domain/model';
import { Address } from '@graphql/modules/address/type/address.type';
import { Field, ObjectType } from 'type-graphql';


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
