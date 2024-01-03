import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';

import { User } from '../../models/user';
import { RequestValidationError, BadRequestError } from '../../lib/errors.lib';

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('Email already taken');

  const user = User.build({
    email,
    password,
  });

  await user.save();

  res.status(201).send(user);
};

export const signin = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);

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
