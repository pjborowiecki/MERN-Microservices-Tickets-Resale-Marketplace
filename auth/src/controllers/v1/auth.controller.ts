import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import * as jsonwebtoken from 'jsonwebtoken';

import config from '../../config/index';
import { User } from '../../models/user';
import { RequestValidationError, BadRequestError } from '../../lib/errors.lib';

export const signup = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('Email already taken');

  const user = User.build({
    email,
    password,
  });

  await user.save();

  const jwt = jsonwebtoken.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.auth.jwt_sign_key,
  );

  request.session = {
    jwt: jwt,
  };

  response.status(201).send(user);
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
