import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './type/user-type';
import { UserInput } from './input/user-input';
import { UserService } from '../../../../domain/user/user-service';
import { Login } from '../user/type/login-type';
import { LoginInput } from './input/login-input';

import { IsAuthenticated } from '../../../auth-middleware';
import { UsersDetailsInput } from './input/users-details-input';
import { UsersPaginatedModel } from './type/users-paginetad-type';

@Resolver()
export class UserResolver {
  @IsAuthenticated()
  @Query(() => UsersPaginatedModel)
  users(@Arg('data', () => UsersDetailsInput, { nullable: true }) data?: UsersDetailsInput) {
    return UserService.findAllUsers(data);
  }

  @IsAuthenticated()
  @Query(() => User)
  user(@Arg('id', () => String) id: string) {
    return UserService.findUserById(id);
  }

  @IsAuthenticated()
  @Mutation(() => User)
  createUser(@Arg('data', () => UserInput) data: UserInput) {
    return UserService.createUser(data);
  }

  @Mutation(() => Login)
  login(@Arg('data', () => LoginInput) data: LoginInput) {
    return UserService.loginUser(data);
  }
}
