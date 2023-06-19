import express from 'express';
import areasController from './areas.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const areasRouter = express.Router();
areasRouter.route('/create').post(sanitize(), jwtStrategy,areasController.index);
areasRouter.route('/list').get(sanitize(),areasController.List);
areasRouter.route('/delete').delete(sanitize(),jwtStrategy,areasController.getareaDelete);
areasRouter.route('/update').post(sanitize(),jwtStrategy,areasController.getareaUpdate);
areasRouter.route('/getareasById').get(sanitize(), areasController.getareasListById);
