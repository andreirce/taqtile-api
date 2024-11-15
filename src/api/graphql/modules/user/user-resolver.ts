import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserModel } from './type/user-type';
import { UserInput } from './input/user-input';
import { UserService } from '../../../../domain/user/user-service';
import { LoginModel } from '../../../../domain/model/login-model';
import { LoginInput } from './input/login-input';

import { IsAuthenticated } from '../../../auth-middleware';
import { UsersDetailsInput } from './input/users-details-input';
import { PaginatedUsersModel } from '../../../../core/pagination/paginated-users-model';

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
