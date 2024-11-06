import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserModel } from '../models/user-model';
import { UserInput } from '../inputs/user-input';
import { UserService } from '../services/user-service';
import { LoginModel } from '../models/login-model';
import { LoginInput } from '../inputs/login-input';

import { IsAuthenticated } from '../middlewares/auth-middleware';

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  users() {
    return UserService.findAllUsers();
  }

  @IsAuthenticated()
  @Query(() => UserModel)
  user(@Arg('id', () => String) id: string) {
    return UserService.findUserById(id);
  }

  @IsAuthenticated()
  @Mutation(() => UserModel)
  createUser(@Arg('data', () => UserInput) data: UserInput) {
    return UserService.createUser(data);
  }

  @Mutation(() => LoginModel)
  login(@Arg('data', () => LoginInput) data: LoginInput) {
    return UserService.loginUser(data);
  }
}
