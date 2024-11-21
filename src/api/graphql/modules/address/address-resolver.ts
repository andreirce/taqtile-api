import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AddressInput } from './input/address-input';
import { IsAuthenticated } from '../../../auth-middleware';
import { Address } from './type/address-type';
import { CreateAddressUseCase } from '../../../../domain/address/create-address.use-case';
import { FindAddressByUserIdUseCase } from '../../../../domain/address/find-address-by-user-id.use-case';
import { Service } from 'typedi';
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
