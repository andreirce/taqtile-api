import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserModel } from '../models/user-model';
import { UserInput } from '../inputs/user-input';
import { UserService } from '../services/user-service';

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  async users() {
    return UserService.findAllUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('data', () => UserInput) data: UserInput) {
    return UserService.createUser(data);
  }
}
