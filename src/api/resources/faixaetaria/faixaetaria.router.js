import express from 'express';
import faixaetariaController from './faixaetaria.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const faixaetariaRouter = express.Router();
faixaetariaRouter.route('/create').post(sanitize(), jwtStrategy, faixaetariaController.index);
faixaetariaRouter.route('/list').get(sanitize(),jwtStrategy,faixaetariaController.List);
faixaetariaRouter.route('/delete').delete(sanitize(),jwtStrategy,faixaetariaController.getfaixaetariaDelete);
faixaetariaRouter.route('/update').post(sanitize(),jwtStrategy,faixaetariaController.getfaixaetariaUpdate);
faixaetariaRouter.route('/getfaixaetariaById').get(sanitize(), faixaetariaController.getfaixaetariaListById);









