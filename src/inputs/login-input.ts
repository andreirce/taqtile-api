import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail({}, { message: 'email inválido!' })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  password: string;
}
