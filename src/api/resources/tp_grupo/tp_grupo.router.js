import express from 'express';
import tp_grupoController from './tp_grupo.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const tp_grupoRouter = express.Router();
tp_grupoRouter.route('/create').post(sanitize(), jwtStrategy, tp_grupoController.index);
tp_grupoRouter.route('/list').get(sanitize(),jwtStrategy,tp_grupoController.List);
tp_grupoRouter.route('/delete').delete(sanitize(),jwtStrategy,tp_grupoController.get_tp_grupoDelete);
tp_grupoRouter.route('/update').post(sanitize(),jwtStrategy,tp_grupoController.get_tp_grupoUpdate);









