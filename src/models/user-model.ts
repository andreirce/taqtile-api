import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserModel {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => Date, { nullable: true })
  birthDate!: Date;
}
