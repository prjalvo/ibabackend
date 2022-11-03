import { db } from '../../../models/index.js';
import Sequelize from "sequelize"

export default {

    /* Add user api start here................................*/

      async getAllCargoCount(req, res, next) {
        try {
            db.user.findAll({
                attributes: ['id_cargo', [Sequelize.fn('COUNT', Sequelize.col('id_cargo')), 'total']],
                group: ['id_cargo'],
                include: [{ model: db.cargo, attributes: ["id", "descricao"], }]
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllGrupoCount(req, res, next) {
        try {
            db.grupos.findAll({
                attributes: ["id","id_lider","id_colider","id_supervisor","id_setor","id_area","id_distrito"],                                
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllMembroCount(req, res, next) {
        try {
            db.grupo_membros.findAll({
                attributes: ['nome'],                                
                   include: [{ model: db.grupos, attributes: ["id","id_lider","id_colider","id_supervisor","id_setor","id_area","id_distrito"] }
               ],
            })
                .then(list => {   
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllFormularioCount(req, res, next) {
      
        try {
            db.formularios.findAll({
                attributes: ['id_celula',"membresia","batismo","lider_celula","disc_superv","kids_incl","intr_b_nt","intr_b_nt","ant_test","batalha_esp","tetelestai","vida","tsd","discipulado"],                 
                include: [{ model: db.grupos, attributes: ["id", "descricao","id_lider","id_colider","id_supervisor","id_setor","id_area","id_distrito"] }
               ],                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
}


