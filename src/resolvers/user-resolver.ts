import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserModel } from '../models/user-model';
import { UserInput } from '../inputs/user-input';
import { UserService } from '../services/user-service';
import { LoginModel } from '../models/login-model';
import { LoginInput } from '../inputs/login-input';

import { IsAuthenticated } from '../middlewares/auth-middleware';
import { UsersDetailsInput } from '../inputs/users-details-input';
import { PaginatedUsersModel } from '../models/paginated-users-model';

@Resolver()
export class UserResolver {
  @IsAuthenticated()
  @Query(() => PaginatedUsersModel)
  users(@Arg('data', () => UsersDetailsInput, { nullable: true }) data?: UsersDetailsInput) {
    return UserService.findAllUsers(data);
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
