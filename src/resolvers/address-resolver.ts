import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AddressModel } from '../models/address-model';
import { AddressInput } from '../inputs/address-input';
import { AddressService } from '../services/address-service';
import { IsAuthenticated } from '../middlewares/auth-middleware';

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
