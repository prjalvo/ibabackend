import express from 'express';
import tp_ferramentaController from './tp_ferramenta.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const tp_ferramentaRouter = express.Router();
tp_ferramentaRouter.route('/create').post(jwtStrategy, tp_ferramentaController.index);
tp_ferramentaRouter.route('/list').get(sanitize(),jwtStrategy,tp_ferramentaController.List);
tp_ferramentaRouter.route('/delete').delete(sanitize(),jwtStrategy,tp_ferramentaController.get_tp_ferramentaDelete);
tp_ferramentaRouter.route('/update').post(sanitize(),jwtStrategy,tp_ferramentaController.get_tp_ferramentaUpdate);









