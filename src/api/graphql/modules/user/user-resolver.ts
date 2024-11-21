import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './type/user-type';
import { UserInput } from './input/user-input';
import { Login } from '../user/type/login-type';
import { LoginInput } from './input/login-input';

import { IsAuthenticated } from '@graphql/auth-middleware';
import { UserDetailsInput } from './input/users-details-input';
import { UsersPaginated } from './type/users-paginetad-type';
import { Service } from 'typedi';
import { CreateUserUseCase, FindAllUsersUseCase, findUserUseCase, LoginUseCase } from '@domain/user';

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
  @Query(() => UsersPaginated)
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
