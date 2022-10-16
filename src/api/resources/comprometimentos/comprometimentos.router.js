import express from 'express';
import comprometimentosController from './comprometimentos.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const comprometimentosRouter = express.Router();
comprometimentosRouter.route('/add').post(sanitize(),jwtStrategy, comprometimentosController.addGrupo);
comprometimentosRouter.route('/getAllComprometimentosList').get(sanitize(), comprometimentosController.getAllComprometimentosList);
comprometimentosRouter.route('/getAllComprometimentosListID').get(sanitize(), comprometimentosController.getAllComprometimentosListID);
comprometimentosRouter.route('/update').post(comprometimentosController.update);
//pessoaRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
comprometimentosRouter.route('/getComprometimentosById').get(sanitize(), comprometimentosController.getComprometimentosListById);
comprometimentosRouter.route('/delete').delete(sanitize(), comprometimentosController.Delete);














