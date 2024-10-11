import { ValidationError } from 'class-validator';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';

function plainValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((item) => Object.values(item.constraints));
}

export function customFormatError(formattedError: GraphQLFormattedError) {
  if (formattedError instanceof UserAlreadyExistsException) {
    return {
      message: formattedError.message,
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
