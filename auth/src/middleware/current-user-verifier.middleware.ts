import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config/index';

interface UserPayload {
  id: string;
  email: string;
}

const currentUserVerifier = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  if (!request.session?.jwt) return next();

  try {
    const payload = jwt.verify(
      request.session.jwt,
      config.auth.jwt_sign_key,
    ) as UserPayload;
    request.currentUser = payload;
  } catch (error) {
    console.error(error);
  }

  next();
};

export { currentUserVerifier };
