import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config/index';
import { User } from '../../models/user';
import { PasswordManager } from '../../lib/password-manager.lib';
import { BadRequestError } from '../../lib/errors.lib';

export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('Email already taken');

  const user = User.build({
    email,
    password,
  });

  await user.save();

  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.auth.jwt_sign_key,
  );

  request.session = {
    jwt: userJWT,
  };

  response.status(201).send(user);
};

export const signIn = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError('Invalid email or password');

  const passwordsMatch = await PasswordManager.compare(
    existingUser.password,
    password,
  );

  if (!passwordsMatch) throw new BadRequestError('Inavlid email or password');

  const userJWT = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    config.auth.jwt_sign_key,
  );

  request.session = {
    jwt: userJWT,
  };

  response.status(200).send(existingUser);
};

export const signOut = async (request: Request, response: Response) => {
  if (!request.session?.jwt) return response.send({ currentUser: null });

  try {
    const payload = jwt.verify(request.session.jwt, config.auth.jwt_sign_key);
    response.send({ currentUser: payload });
  } catch (error) {
    response.send({ currentUser: null });
  }
};

export const getCurrentUser = async (request: Request, response: Response) => {
  // TODO
};
