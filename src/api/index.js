import express from 'express';
import { authRouter } from './resources/auth'
import { productRouter } from './resources/product'
import { vendorRouter } from './resources/vendor'
import { categoryRouter } from './resources/category'
import { locationRouter } from './resources/location'
import { cargoRouter } from './resources/cargo'
import { agendaRouter } from './resources/agenda'
import { faixaetariaRouter } from './resources/faixaetaria'
import { ministerioRouter } from './resources/ministerio'
import { tp_grupoRouter } from './resources/tp_grupo'
import { tp_ferramentaRouter } from './resources/tp_ferramenta'
import { grupoRouter } from './resources/grupo'
import { formularioRouter } from './resources/formulario'
import { grupo_membrosRouter } from './resources/grupo_membros'
import { comprometimentosRouter } from './resources/comprometimentos'
import { pessoaRouter } from './resources/pessoa'
import { customerRouter } from './resources/customer';
import { orderRouter } from './resources/order';
import { paymentRouter } from './resources/payment';

 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/customer', customerRouter);
restRouter.use('/location', locationRouter);
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

restRouter.use('/product', productRouter);
restRouter.use('/vendor', vendorRouter);
restRouter.use('/category', categoryRouter);
restRouter.use('/order', orderRouter);
restRouter.use('/payment', paymentRouter);






