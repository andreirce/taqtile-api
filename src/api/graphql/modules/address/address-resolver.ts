import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AddressModel } from '../../../../domain/model/address-model';
import { AddressInput } from './input/address-input';
import { AddressService } from '../../../../domain/address/address-service';
import { IsAuthenticated } from '../../../auth-middleware';

@Resolver()
export class AddressResolver {
  @IsAuthenticated()
  @Mutation(() => AddressModel)
  createAddress(@Arg('data', () => AddressInput) data: AddressInput) {
    return AddressService.createAddress(data);
  }

  @IsAuthenticated()
  @Query(() => [AddressModel])
  findAddressByUserId(@Arg('userId', () => String) id: string) {
    return AddressService.findByUserId(id);
  }
}
