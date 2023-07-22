import express from 'express';
import batismoController from './batismo.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const batismoRouter = express.Router();
batismoRouter.route('/register').post(batismoController.addBatismo);
batismoRouter.route('/getAllBatismoList').get(sanitize(), jwtStrategy, batismoController.getAllBatismoList);
batismoRouter.route('/getAllBatismoListById').get(sanitize(), jwtStrategy, batismoController.getAllBatismoListById);
batismoRouter.route('/update').post(jwtStrategy, batismoController.batismoUpdate);
batismoRouter.route('/delete').post(sanitize(), jwtStrategy, batismoController.deleteBatismoList);
