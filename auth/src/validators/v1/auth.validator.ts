import { body, ValidationChain } from 'express-validator';

export const signup: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isString()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];
