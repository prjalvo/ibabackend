import express from 'express';
import formularioController from './formulario.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const formularioRouter = express.Router();
formularioRouter.route('/add').post(formularioController.addFormulario);
formularioRouter.route('/update').post(sanitize(), formularioController.update);
formularioRouter.route('/getFormularioById').get(sanitize(), formularioController.getFormularioListById);















