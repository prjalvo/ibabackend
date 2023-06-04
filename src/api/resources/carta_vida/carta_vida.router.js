import express from 'express';
import carta_vidaController from './cargo.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';
import { validateBody, schemas } from '../../../middleware/validator.js';


export const carta_vidaRouter = express.Router();
carta_vidaRouter.route('/upload').post(carta_vidaController.uploadController);









