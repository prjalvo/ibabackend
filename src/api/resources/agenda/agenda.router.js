import express from 'express';
import agendaController from './agenda.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const agendaRouter = express.Router();
agendaRouter.route('/add').post(sanitize(),agendaController.addAgenda);
agendaRouter.route('/update').post(agendaController.getAgendaUpdate);
agendaRouter.route('/getAllAgendaList').get(sanitize(), agendaController.getAllAgendaList);
agendaRouter.route('/delete').delete(sanitize(), agendaController.getAgendaDelete);

agendaRouter.route('/getVisita_Setor').get(sanitize(), agendaController.getVisita_Setor);
agendaRouter.route('/getVisita_Area').get(sanitize(), agendaController.getVisita_Area);
agendaRouter.route('/getVisita_Distrito').get(sanitize(), agendaController.getVisita_Distrito);
















