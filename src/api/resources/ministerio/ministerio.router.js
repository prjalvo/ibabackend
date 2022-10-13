import express from 'express';
import ministerioController from './ministerio.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const ministerioRouter = express.Router();
ministerioRouter.route('/create').post(sanitize(), jwtStrategy, ministerioController.index);
ministerioRouter.route('/list').get(sanitize(),jwtStrategy,ministerioController.List);
ministerioRouter.route('/delete').delete(sanitize(),jwtStrategy,ministerioController.getministerioDelete);
ministerioRouter.route('/update').post(sanitize(),jwtStrategy,ministerioController.getministerioUpdate);
ministerioRouter.route('/getministerioById').get(sanitize(), ministerioController.getMinisterioListById);









