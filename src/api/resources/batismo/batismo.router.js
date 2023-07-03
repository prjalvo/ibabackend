import express from 'express';
import batismoController from './batismo.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const batismoRouter = express.Router();
batismoRouter.route('/register').post(batismoController.addUser);
batismoRouter.route('/user/getAllUserList').get(sanitize(), jwtStrategy, batismoController.getAllUserList);
batismoRouter.route('/user/update').post(jwtStrategy, batismoController.userUpdate);
batismoRouter.route('/user/delete').post(sanitize(), jwtStrategy, batismoController.deleteUserList);
batismoRouter.route('/getUserByEmailId').get( batismoController.findUser);
batismoRouter.route('/rootLogin').post(sanitize(),validateBody(schemas.loginSchema),localStrategy, batismoController.login);
batismoRouter.route('/forgotpassword').post(batismoController.forgotpassword);
batismoRouter.route('/resetpassword').post(batismoController.resetpassword);
