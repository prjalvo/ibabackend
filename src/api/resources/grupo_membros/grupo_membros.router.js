import express from 'express';
import grupo_membrosController from './grupo_membros.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';



export const grupo_membrosRouter = express.Router();
grupo_membrosRouter.route('/add').post(sanitize(),jwtStrategy, grupo_membrosController.addGrupo);
grupo_membrosRouter.route('/getAllGrupoMembrosList').get(sanitize(), grupo_membrosController.getAllGrupoList);
grupo_membrosRouter.route('/getAllGrupoMembrosListID').get(sanitize(), grupo_membrosController.getAllGrupoMembrosListID);

grupo_membrosRouter.route('/getAllGrupoMembrosFormula').get(sanitize(), grupo_membrosController.getAllGrupoMembrosFormula);

grupo_membrosRouter.route('/update').post(grupo_membrosController.update);
//pessoaRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
grupo_membrosRouter.route('/getGrupoById').get(sanitize(), grupo_membrosController.getGrupoListById);
grupo_membrosRouter.route('/delete').delete(sanitize(), grupo_membrosController.grupoDelete);














