import { db } from '../../../models';
const { Op } = require("sequelize");

export default {

    async addFormulario(req, res, next) {
        console.log(req.body)
        try {            
            const { id_celula,id_membro,membresia,data_membresia,batismo,data_batismo,lider_celula,data_lider_celula,disc_superv,
                data_disc_superv,kids_incl,data_kids_incl,intr_b_nt,data_intr_b_nt,ant_test,data_ant_test,
                batalha_esp,data_batalha_esp,tetelestai,data_tetelestai,vida,data_vida,tsd,discipulado,data_discipulado } = req.body;
            db.formularios.findOne({
                where: { id_membro: id_membro }
            })
                .then(formularios => {
                    if (!formularios) {
                        return db.formularios.create({
                            id_celula: id_celula ,                            
                            id_membro: id_membro,
                            membresia: membresia ,
                            data_membresia: data_membresia,
                            batismo: batismo,
                            data_batismo: data_batismo,
                            lider_celula: lider_celula,
                            data_lider_celula: data_lider_celula ,
                            disc_superv: disc_superv ,
                            data_disc_superv: data_disc_superv ,
                            kids_incl: kids_incl ,
                            data_kids_incl: data_kids_incl ,
                            intr_b_nt: intr_b_nt ,
                            data_intr_b_nt: data_intr_b_nt ,
                            ant_test: ant_test ,
                            data_ant_test: data_ant_test ,
                            batalha_esp: batalha_esp,
                            data_batalha_esp: data_batalha_esp ,
                            tetelestai: tetelestai ,
                            data_tetelestai: data_tetelestai,
                            vida: vida,
                            data_vida: data_vida,
                            tsd: tsd,
                            discipulado: discipulado,
                            data_discipulado:data_discipulado,
                        })
                    }
                    return db.formularios.update({
                        id_celula: id_celula ? id_celula : formularios.id_celula,                            
                        id_membro: id_membro ? id_membro : formularios.id_membro,
                        membresia: membresia ? membresia : formularios.membresia,
                        data_membresia: data_membresia ? data_membresia: formularios.data_membresia,
                        batismo: batismo ? batismo : formularios.batismo,
                        data_batismo: data_batismo ? data_batismo : formularios.data_batismo,
                        lider_celula: lider_celula ? lider_celula : formularios.lider_celula,
                        data_lider_celula: data_lider_celula ? data_lider_celula : formularios.data_lider_celula,
                        disc_superv: disc_superv ? disc_superv : formularios.disc_superv,
                        data_disc_superv: data_disc_superv ? data_disc_superv : formularios.data_disc_superv,
                        kids_incl: kids_incl ? kids_incl : formularios.kids_incl,
                        data_kids_incl: data_kids_incl ? data_kids_incl : formularios.data_kids_incl,
                        intr_b_nt: intr_b_nt ? intr_b_nt : formularios.intr_b_nt,
                        data_intr_b_nt: data_intr_b_nt ? data_intr_b_nt : formularios.data_intr_b_nt,
                        ant_test: ant_test ? ant_test : formularios.ant_test,
                        data_ant_test: data_ant_test ? data_ant_test : formularios.data_ant_test,
                        batalha_esp: batalha_esp ? batalha_esp : formularios.batalha_esp,
                        data_batalha_esp: data_batalha_esp ? data_batalha_esp : formularios.data_batalha_esp,
                        tetelestai: tetelestai ? tetelestai : formularios.tetelestai,
                        data_tetelestai: data_tetelestai ? data_tetelestai : formularios.data_tetelestai,                           
                        vida: vida ? vida : formularios.vida ,
                        data_vida: data_vida ? data_vida : formularios.data_vida,
                        tsd: tsd ? tsd : formularios.tsd,
                        discipulado: discipulado ? discipulado : formularios.discipulado,
                        data_discipulado: data_discipulado ? data_discipulado : formularios.data_discipulado

                    }, { where: { id_membro: id_membro } })
                })
                .then(formularios => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })
                .catch(function (err) {
                     next(err)
                
                });
        }
        catch (err) {
            throw new RequestError(err);
        }
    },

    
   
    async update(req, res, next) {
        
        try {
            const {id_celula,id_membro,membresia,data_membresia,batismo,data_batismo,lider_celula,data_lider_celula,disc_superv,
                data_disc_superv,kids_incl,data_kids_incl,intr_b_nt,data_intr_b_nt,ant_test,data_ant_test,
                batalha_esp,data_batalha_esp,tetelestai,data_tetelestai} = req.body;  
            db.formulario.findOne({ where: { id_membro: id_membro } })
                .then(formulario => {
                    if (formulario) {
                        return db.formulario.update({
                            id_celula: id_celula ? id_celula : formulario.id_celula,                            
                            id_membro: id_membro ? id_membro : formulario.id_membro,
                            membresia: membresia ? membresia : formulario.membresia,
                            data_membresia: data_membresia ? data_membresia: formulario.data_membresia,
                            batismo: batismo ? batismo : formulario.batismo,
                            data_batismo: data_batismo ? data_batismo : formulario.data_batismo,
                            lider_celula: lider_celula ? lider_celula : formulario.lider_celula,
                            data_lider_celula: data_lider_celula ? data_lider_celula : formulario.data_lider_celula,
                            disc_superv: disc_superv ? disc_superv : formulario.disc_superv,
                            data_disc_superv: data_disc_superv ? data_disc_superv : formulario.data_disc_superv,
                            kids_incl: kids_incl ? kids_incl : formulario.kids_incl,
                            data_kids_incl: data_kids_incl ? data_kids_incl : formulario.data_kids_incl,
                            intr_b_nt: intr_b_nt ? intr_b_nt : formulario.intr_b_nt,
                            data_intr_b_nt: data_intr_b_nt ? data_intr_b_nt : formulario.data_intr_b_nt,
                            ant_test: ant_test ? ant_test : formulario.ant_test,
                            data_ant_test: data_ant_test ? data_ant_test : formulario.data_ant_test,
                            batalha_esp: batalha_esp ? batalha_esp : formulario.batalha_esp,
                            data_batalha_esp: data_batalha_esp ? data_batalha_esp : formulario.data_batalha_esp,
                            tetelestai: tetelestai ? tetelestai : formulario.tetelestai,
                            data_tetelestai: data_tetelestai ? data_tetelestai : formulario.data_tetelestai                           
                                                                           
                        }, { where: { id: formulario.id } })
                    }
                    throw new RequestError('Not Found Product', 409);
                })
                .then((p) => {
                    res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    
    async getFormularioListById(req, res, next) {  
        try {
            db.formularios.findAll({
                where: { id_celula: req.query.id_celula,id_membro:req.query.id_membro},               
                order: [['createdAt', 'DESC']],
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },       
   
}


