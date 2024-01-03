import { type Request, type Response } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';

import { config } from '../../config/index';
import { User } from '../../models/user';
import { PasswordManager } from '../../lib/password-manager.lib';
import { BadRequestError } from '../../lib/errors.lib';

export const signup = async (request: Request, response: Response) => {
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

export const signin = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError('Invalid email or password');

  const passwordsMatch = await PasswordManager.compare(
    existingUser.password,
    password,
  );

  if (!passwordsMatch) throw new BadRequestError('Inavlid email or password');

  const jwt = jsonwebtoken.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    config.auth.jwt_sign_key,
  );

  request.session = {
    jwt: jwt,
  };

  response.status(200).send(existingUser);
};

export const signout = async (req: Request, res: Response) => {
  // TODO
};

export const getCurrentUser = async (req: Request, res: Response) => {
  // TODO
};
