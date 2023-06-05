import express from 'express';
import grupoController from './grupo.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const grupoRouter = express.Router();
grupoRouter.route('/add').post(jwtStrategy, grupoController.addGrupo);
grupoRouter.route('/getAllGrupoList').get(sanitize(), grupoController.getAllGrupoList);
grupoRouter.route('/getAllLider').get(sanitize(), grupoController.getAllLider);
grupoRouter.route('/update').post(sanitize(), grupoController.update);
//pessoaRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
grupoRouter.route('/getGrupoById').get(sanitize(), grupoController.getGrupoListById);
grupoRouter.route('/delete').delete(sanitize(), grupoController.grupoDelete);














