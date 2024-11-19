import { IsInt, IsOptional, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserDetailsModel } from '../../../../../domain/model/user-model';

@InputType()
export class UserDetailsInput implements UserDetailsModel {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'O valor deve ser maior que 0.' })
  @IsInt({ message: 'Precisa fornecer um número inteiro.' })
  limit?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'O valor deve ser maior que 0.' })
  @IsInt({ message: 'Precisa fornecer um número inteiro.' })
  page?: number;
}
