import express, { type Router } from 'express';

import * as authController from '../../controllers/v1/auth.controller';
import * as authValidator from '../../validators/v1/auth.validator';

import { requestValidator } from '../../middleware/request-validator.middleware';

const authRouter: Router = express.Router();

authRouter
  .route('/signup')
  .post(authValidator.signup, requestValidator, authController.signup);

authRouter
  .route('/signin')
  .post(authValidator.signin, requestValidator, authController.signin);

authRouter.route('/signout').post(authController.signout);
authRouter.route('/currentuser').get(authController.getCurrentUser);

export default authRouter;
