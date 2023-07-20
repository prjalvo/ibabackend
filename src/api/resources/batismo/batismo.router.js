import express from 'express';
import batismoController from './batismo.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const batismoRouter = express.Router();
batismoRouter.route('/register').post(batismoController.addBatismo);
batismoRouter.route('/getAllBatismoList').get(sanitize(), jwtStrategy, batismoController.getAllBatismoList);
authRouter.route('/update').post(jwtStrategy, authController.batismoUpdate);
authRouter.route('/delete').post(sanitize(), jwtStrategy, authController.deleteBatismoList);
