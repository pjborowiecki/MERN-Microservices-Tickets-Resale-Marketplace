import express, { type Router } from 'express';

import * as authController from '../../controllers/v1/auth.controller';

const authRouter: Router = express.Router();

authRouter.route('/signup').post(authController.signup);
authRouter.route('/signin').post(authController.signin);
authRouter.route('/signout').post(authController.signout);
authRouter.route('/currentuser').get(authController.getCurrentUser);

export default authRouter;
