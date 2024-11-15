import { ValidationError } from 'class-validator';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { UserAlreadyExistsError } from '../../core/error/user-already-exists-error';
import { unwrapResolverError } from '@apollo/server/errors';
import { LoginError } from '../../core/error/login-error';
import { UnauthorizedError } from '../../core/error/unauthorized-error';
import { UserNotFoundError } from '../../core/error/user-not-found-error';

function plainValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((item) => Object.values(item.constraints));
}

export function customFormatError(formattedError: GraphQLFormattedError, error: unknown) {
  const unwrappedError = unwrapResolverError(error);

  if (unwrappedError instanceof UserAlreadyExistsError) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof LoginError) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof UnauthorizedError) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (unwrappedError instanceof UserNotFoundError) {
    return {
      message: unwrappedError.message,
      code: unwrappedError.statusCode,
    };
  }

  if (formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
    const validationErrors = formattedError.extensions?.validationErrors;

    return {
      message: formattedError.message,
      code: 400,
      extensions: {
        invalidInputs: plainValidationErrors(validationErrors as ValidationError[]),
      },
    };
  }

  return formattedError;
}
