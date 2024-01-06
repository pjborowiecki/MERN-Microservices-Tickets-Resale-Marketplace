import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '../lib/errors.lib';

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
): void | Response => {
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

export { errorHandler };
