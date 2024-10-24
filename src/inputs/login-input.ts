import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail({}, { message: 'email inválido!' })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  password: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'Este campo deve ser um valor Booleano' })
  rememberMe?: boolean;
}
