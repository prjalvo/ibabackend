import express from 'express';
import orderController from './order.controller.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
// import { validateBody, schemas } from '../../../middleware/validator';

export const orderRouter = express.Router();
orderRouter.route('/count').get(sanitize(),orderController.getAllCargoCount);
orderRouter.route('/count/getAllGrupoCount').get(sanitize(),orderController.getAllGrupoCount);
orderRouter.route('/count/getAllMembroCount').get(sanitize(),orderController.getAllMembroCount);
orderRouter.route('/count/getAllFormularioCount').get(sanitize(),orderController.getAllFormularioCount);



















