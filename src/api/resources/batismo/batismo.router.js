import express from 'express';
import batismoController from './batismo.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const batismoRouter = express.Router();
batismoRouter.route('/register').post(batismoController.addBatismo);
batismoRouter.route('/getAllBatismoList').get(sanitize(),batismoController.getAllBatismoList);
batismoRouter.route('/getAllBatismoListById').post(sanitize(), batismoController.getAllBatismoListById);
batismoRouter.route('/update').post(batismoController.batismoUpdate);
batismoRouter.route('/delete').post(sanitize(), jwtStrategy, batismoController.deleteBatismoList);
