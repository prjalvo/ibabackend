import express from 'express';
import agendaController from './agenda.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';



export const agendaRouter = express.Router();
agendaRouter.route('/add').post(sanitize(),agendaController.addAgenda);
agendaRouter.route('/getAllAgendaList').get(sanitize(), agendaController.getAllAgendaList);
agendaRouter.route('/delete').get(sanitize(), agendaController.getAgendaDelete);














