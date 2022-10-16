import express from 'express';
import { authRouter } from './resources/auth/index.js'
import { cargoRouter } from './resources/cargo/index.js'
import { agendaRouter } from './resources/agenda/index.js'
import { faixaetariaRouter } from './resources/faixaetaria/index.js'
import { ministerioRouter } from './resources/ministerio/index.js'
import { tp_grupoRouter } from './resources/tp_grupo/index.js'
import { tp_ferramentaRouter } from './resources/tp_ferramenta/index.js'
import { grupoRouter } from './resources/grupo/index.js'
import { formularioRouter } from './resources/formulario/index.js'
import { grupo_membrosRouter } from './resources/grupo_membros/index.js'
import { comprometimentosRouter } from './resources/comprometimentos/index.js'
import { pessoaRouter } from './resources/pessoa/index.js'


 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/cargo', cargoRouter);
restRouter.use('/agenda', agendaRouter);
restRouter.use('/faixaetaria', faixaetariaRouter);
restRouter.use('/ministerio', ministerioRouter);
restRouter.use('/tp_grupo', tp_grupoRouter);
restRouter.use('/tp_ferramenta', tp_ferramentaRouter);
restRouter.use('/pessoa', pessoaRouter);
restRouter.use('/grupo', grupoRouter);
restRouter.use('/formulario', formularioRouter);
restRouter.use('/grupo_membros', grupo_membrosRouter);
restRouter.use('/comprometimentos', comprometimentosRouter);

