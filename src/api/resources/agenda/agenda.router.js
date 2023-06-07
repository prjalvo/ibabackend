import express from 'express';
import agendaController from './agenda.controller.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { jwtStrategy } from '../../../middleware/strategy.js';



export const agendaRouter = express.Router();
agendaRouter.route('/add').post(sanitize(),agendaController.addAgenda);
agendaRouter.route('/update').post(sanitize(), agendaController.getAgendaUpdate);
agendaRouter.route('/getAllAgendaList').get(sanitize(), agendaController.getAllAgendaList);
agendaRouter.route('/delete').delete(sanitize(), agendaController.getAgendaDelete);
agendaRouter.route('/getAllVisit').get(sanitize(), agendaController.getAllVisit);















