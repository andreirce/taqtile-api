import { ValidationError } from 'class-validator';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { unwrapResolverError } from '@apollo/server/errors';
import { CustomError } from '@core/error';

function plainValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((item) => Object.values(item.constraints));
}

export function customFormatError(formattedError: GraphQLFormattedError, error: unknown) {
  const unwrappedError = unwrapResolverError(error);

  if (unwrappedError instanceof CustomError) {
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
