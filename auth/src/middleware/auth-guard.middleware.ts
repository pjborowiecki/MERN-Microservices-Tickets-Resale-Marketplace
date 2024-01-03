import type { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../lib/errors.lib';

export const authGuard = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  if (!request.currentUser) throw new NotAuthorizedError();
  next();
};
