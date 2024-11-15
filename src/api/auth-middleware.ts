import jwt from 'jsonwebtoken';

import { MiddlewareFn, createMethodMiddlewareDecorator } from 'type-graphql';
import { UnauthorizedError } from '../core/error/unauthorized-error';
import { ExpressContext } from '../domain/model/express-context-model';
import { User } from '../domain/model/user-model';

const authHandler: MiddlewareFn<ExpressContext> = ({ context }, next) => {
  const authorization = context.req.headers?.authorization;

  if (!authorization) {
    throw new UnauthorizedError('O token não foi fornecido ou está mal formatado.');
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;

    context.req.user = decoded;
  } catch {
    throw new UnauthorizedError('Acesso negado! Token inválido ou expirado.');
  }

  return next();
};

export const IsAuthenticated = () => createMethodMiddlewareDecorator(authHandler);
