import jwt from 'jsonwebtoken';

import { MiddlewareFn, createMethodMiddlewareDecorator } from 'type-graphql';
import { UnauthorizedException } from '../exceptions/unauthorized-exception';
import { ExpressContext } from '../interfaces/express-context-interface';
import { CustomJwtPayload } from '../interfaces/custom-jwt-payload-interface';

const authHandler: MiddlewareFn<ExpressContext> = ({ context }, next) => {
  const authorization = context.req.headers?.authorization;

  if (!authorization) {
    throw new UnauthorizedException('O token não foi fornecido.');
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

    context.req.user = decoded;
  } catch {
    throw new UnauthorizedException('Acesso negado! Você não tem permissão para acessar este recurso.');
  }

  return next();
};

export const IsAuthenticated = () => createMethodMiddlewareDecorator(authHandler);
