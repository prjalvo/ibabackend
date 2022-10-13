import express from 'express';
import faixaetariaController from './faixaetaria.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const faixaetariaRouter = express.Router();
faixaetariaRouter.route('/create').post(sanitize(), jwtStrategy, faixaetariaController.index);
faixaetariaRouter.route('/list').get(sanitize(),jwtStrategy,faixaetariaController.List);
faixaetariaRouter.route('/delete').delete(sanitize(),jwtStrategy,faixaetariaController.getfaixaetariaDelete);
faixaetariaRouter.route('/update').post(sanitize(),jwtStrategy,faixaetariaController.getfaixaetariaUpdate);
faixaetariaRouter.route('/getfaixaetariaById').get(sanitize(), faixaetariaController.getfaixaetariaListById);









