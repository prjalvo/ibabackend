import express from 'express';
import pessoaController from './pessoa.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const pessoaRouter = express.Router();
pessoaRouter.route('/add').post(sanitize(),jwtStrategy, pessoaController.addPessoa);
pessoaRouter.route('/getAllpessoaList').get(sanitize(), pessoaController.getAllPessoaList);
pessoaRouter.route('/update').post(sanitize(), pessoaController.update);
//pessoaRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
pessoaRouter.route('/getPessoaById').get(sanitize(), pessoaController.getPessoaListById);
pessoaRouter.route('/delete').delete(sanitize(), pessoaController.pessoaDelete);














