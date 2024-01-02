import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '../lib/errors';
import logger from '../middleware/logger.middleware';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.error(error);

  if (error instanceof CustomError) {
    return response
      .status(error.statusCode)
      .send({ errors: error.serializeErrors() });
  }

  response.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });

  next();
};

export default errorHandler;
