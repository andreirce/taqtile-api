import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { LoginInputModel } from '@domain/model';

@InputType()
export class LoginInput implements LoginInputModel {
  @Field(() => String)
  @IsEmail({}, { message: 'email inválido!' })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  password: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'Por favor, marque o campo "rememberMe" como verdadeiro ou falso.' })
  rememberMe?: boolean;
}
