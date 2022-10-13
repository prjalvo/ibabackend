import express from 'express';
import formularioController from './formulario.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';



export const formularioRouter = express.Router();
formularioRouter.route('/add').post(formularioController.addFormulario);
formularioRouter.route('/update').post(sanitize(), formularioController.update);
formularioRouter.route('/getFormularioById').get(sanitize(), formularioController.getFormularioListById);















