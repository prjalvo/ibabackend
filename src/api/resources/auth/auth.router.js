import express from 'express';
import authController from './auth.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const authRouter = express.Router();
authRouter.route('/register').post(authController.addUser);
authRouter.route('/user/getAllUserList').get(sanitize(), jwtStrategy, authController.getAllUserList);
authRouter.route('/user/update').post(sanitize(), jwtStrategy, authController.userUpdate);
authRouter.route('/user/delete').post(sanitize(), jwtStrategy, authController.deleteUserList);
authRouter.route('/getUserByEmailId').get( authController.findUser);
authRouter.route('/rootLogin').post(sanitize(),validateBody(schemas.loginSchema),localStrategy, authController.login);


