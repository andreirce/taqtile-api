import { IsInt, IsOptional, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UsersDetailsInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'O valor deve ser maior que 0.' })
  @IsInt({ message: 'Precisa fornecer um número inteiro.' })
  limit?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'O valor deve ser maior que 0.' })
  @IsInt({ message: 'Precisa fornecer um número inteiro.' })
  skip?: number;
}
