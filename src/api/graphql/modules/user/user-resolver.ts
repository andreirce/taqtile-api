import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './type/user-type';
import { UserInput } from './input/user-input';
import { Login } from '../user/type/login-type';
import { LoginInput } from './input/login-input';

import { IsAuthenticated } from '../../../auth-middleware';
import { UserDetailsInput } from './input/users-details-input';
import { UsersPaginatedModel } from './type/users-paginetad-type';
import { CreateUserUseCase } from '../../../../domain/user/create-user.use-case';
import { FindAllUsersUseCase } from '../../../../domain/user/find-all-users.use-case';
import { findUserUseCase } from '../../../../domain/user/find-user.use-case';
import { LoginUseCase } from '../../../../domain/user/login.use-case';
import { Service } from 'typedi';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserUseCase: findUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @IsAuthenticated()
  @Query(() => UsersPaginatedModel)
  users(@Arg('data', () => UserDetailsInput, { nullable: true }) data?: UserDetailsInput) {
    return this.findAllUsersUseCase.exec(data);
  }

  @IsAuthenticated()
  @Query(() => User)
  user(@Arg('id', () => String) id: string) {
    return this.findUserUseCase.exec(id);
  }

  @IsAuthenticated()
  @Mutation(() => User)
  createUser(@Arg('data', () => UserInput) data: UserInput) {
    return this.createUserUseCase.exec(data);
  }

  @Mutation(() => Login)
  login(@Arg('data', () => LoginInput) data: LoginInput) {
    return this.loginUseCase.exec(data);
  }
}
