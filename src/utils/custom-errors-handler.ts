import { ValidationError } from 'class-validator';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';
import { unwrapResolverError } from '@apollo/server/errors';
import { LoginException } from '../exceptions/login-exception';
import { UnauthorizedException } from '../exceptions/unauthorized-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';

function plainValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((item) => Object.values(item.constraints));
}

export function customFormatError(formattedError: GraphQLFormattedError, error: unknown) {
  const unwrappedError = unwrapResolverError(error);

  if (unwrappedError instanceof UserAlreadyExistsException) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof LoginException) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof UnauthorizedException) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof UserNotFoundException) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
    const validationErrors = formattedError.extensions?.validationErrors;

    return {
      message: formattedError.message,
      extensions: {
        invalidInputs: plainValidationErrors(validationErrors as ValidationError[]),
      },
    };
  }

  return formattedError;
}
