import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddressInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de CEP é obrigatório!' })
  cep: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de Rua é obrigatório!' })
  street: string;

  @Field(() => Number)
  @IsNotEmpty({ message: 'O Número da residência é obrigatório!' })
  streetNumber: number;

  @Field(() => String, { nullable: true })
  complement?: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de Bairro é obrigatório!' })
  neighborhood: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de Cidade é obrigatório!' })
  city: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de Estado é obrigatório!' })
  state: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'O campo de id é obrigatório!' })
  @IsString({ message: 'Por favor, digite um id válido' })
  userId: string;
}
