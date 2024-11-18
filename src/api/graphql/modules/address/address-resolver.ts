import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AddressInput } from './input/address-input';
import { AddressService } from '../../../../domain/address/address-service';
import { IsAuthenticated } from '../../../auth-middleware';
import { Address } from './type/address-type';

@Resolver()
export class AddressResolver {
  @IsAuthenticated()
  @Mutation(() => Address)
  createAddress(@Arg('data', () => AddressInput) data: AddressInput) {
    return AddressService.createAddress(data);
  }

  @IsAuthenticated()
  @Query(() => [Address])
  findAddressByUserId(@Arg('userId', () => String) id: string) {
    return AddressService.findByUserId(id);
  }
}
