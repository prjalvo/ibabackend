import express from 'express';
import carta_vidaController from './carta_vida.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';


export const carta_vidaRouter = express.Router();
carta_vidaRouter.route('/create').post(sanitize(), jwtStrategy, carta_vidaRouterController.index);
carta_vidaRouter.route('/list').get(sanitize(),carta_vidaRouterController.List);
carta_vidaRouter.route('/delete').delete(sanitize(),jwtStrategy,carta_vidaRouterController.getcarta_vidaRouterDelete);
carta_vidaRouter.route('/update').post(sanitize(),jwtStrategy,carta_vidaRouterController.getcarta_vidaRouterUpdate);
carta_vidaRouter.route('/getCargoById').get(sanitize(),carta_vidaRouterController.getcarta_vidaRouterListById);









