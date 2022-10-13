import express from 'express';
import cargoController from './cargo.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const cargoRouter = express.Router();
cargoRouter.route('/create').post(sanitize(), jwtStrategy, cargoController.index);
cargoRouter.route('/list').get(sanitize(),jwtStrategy,cargoController.List);
cargoRouter.route('/delete').delete(sanitize(),jwtStrategy,cargoController.getcargoDelete);
cargoRouter.route('/update').post(sanitize(),jwtStrategy,cargoController.getcargoUpdate);
cargoRouter.route('/getCargoById').get(sanitize(), cargoController.getCargoListById);









