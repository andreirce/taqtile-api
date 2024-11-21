import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AddressInput } from './input/address-input';
import { IsAuthenticated } from '@graphql/auth-middleware';
import { Address } from './type/address-type';
import { Service } from 'typedi';
import { CreateAddressUseCase, FindAddressByUserIdUseCase } from '@domain/address';

@Service()
@Resolver()
export class AddressResolver {
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly findAddresByUserIdUseCase: FindAddressByUserIdUseCase,
  ) {}

  @IsAuthenticated()
  @Mutation(() => Address)
  createAddress(@Arg('data', () => AddressInput) data: AddressInput) {
    return this.createAddressUseCase.exec(data)
  }

  @IsAuthenticated()
  @Query(() => [Address])
  findAddressByUserId(@Arg('userId', () => String) id: string) {
    return this.findAddresByUserIdUseCase.exec(id)
  }
}
