import { IsEmail, IsNotEmpty, Length, Matches, MaxDate, MinDate } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  name: string;

  @Field(() => String)
  @IsEmail({}, { message: 'email inválido!' })
  email: string;

  @Field(() => String)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'A senha deve conter pelo menos 1 letra e 1 número',
  })
  @Length(6, undefined, { message: 'Senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @Field(() => Date, { nullable: true })
  @MinDate(new Date('1900-01-01'), { message: 'A data de nascimento é muito antiga' })
  @MaxDate(new Date(), { message: 'A data de nascimento não pode ser futura' })
  birthDate?: Date;
}
