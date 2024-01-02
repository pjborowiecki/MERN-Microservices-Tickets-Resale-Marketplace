import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';

import {
  RequestValidationError,
  DatabaseConnectionError,
} from '../../lib/errors';

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  console.log('Creating a user...');
  console.log(res);
  throw new DatabaseConnectionError();
};

export const signin = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    if (!res) console.log('Shit, no res');

    res.status(200).send('handleSignin');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('handleSignout');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('getCurrentUser');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};
