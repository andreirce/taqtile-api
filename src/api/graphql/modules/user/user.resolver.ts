import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './type/user.type';
import { UserInput } from './input/user.input';
import { Login } from './type/login.type';
import { LoginInput } from './input/login.input';

import { IsAuthenticated } from '@graphql/auth-middleware';
import { UserDetailsInput } from './input/users-details.input';
import { UsersPaginated } from './type/users-paginetad.type';
import { Service } from 'typedi';
import { CreateUserUseCase, FindAllUsersUseCase, FindUserUseCase, LoginUseCase } from '@domain/user';
import { LoginModel, UsersPaginationModel } from '@domain/model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { ProcessCsvUseCase } from '@domain/user/process-csv.use-case';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly processCsvUseCase: ProcessCsvUseCase,
  ) {}

  @IsAuthenticated()
  @Query(() => UsersPaginated)
  users(
    @Arg('data', () => UserDetailsInput, { nullable: true }) data?: UserDetailsInput,
  ): Promise<UsersPaginationModel> {
    return this.findAllUsersUseCase.exec(data);
  }

  @IsAuthenticated()
  @Query(() => User)
  user(@Arg('id', () => String) id: string): Promise<User> {
    return this.findUserUseCase.exec(id);
  }

  @Mutation(() => String)
  async uploadCsv(@Arg('file', () => GraphQLUpload) file: FileUpload): Promise<string> {
    await this.processCsvUseCase.exec(file);
    return 'Arquivo processado com sucesso!';
  }

  @IsAuthenticated()
  @Mutation(() => User)
  createUser(@Arg('data', () => UserInput) data: UserInput): Promise<User> {
    return this.createUserUseCase.exec(data);
  }

  @Mutation(() => Login)
  login(@Arg('data', () => LoginInput) data: LoginInput): Promise<LoginModel> {
    return this.loginUseCase.exec(data);
  }
}
