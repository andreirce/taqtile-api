import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserModel } from '../models/user-model';
import { CreateUserInput } from '../inputs/user-input';
import { UserService } from '../services/user-service';

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  async users() {
    return UserService.findAllUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {
    return UserService.createUser(data);
  }
}
