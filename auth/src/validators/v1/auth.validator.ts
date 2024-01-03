import { body, ValidationChain } from 'express-validator';

export const signUp: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email address').notEmpty(),
  body('password')
    .isString()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

export const signIn: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email address').notEmpty(),
  body('password')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];
