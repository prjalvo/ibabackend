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
                attributes: ['id'],                                
                
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
                attributes: ['id_celula',
                 [Sequelize.fn('SUM', Sequelize.col('membresia')), 'total_membresia'],                 
                 [Sequelize.fn('SUM', Sequelize.col('batismo')), 'total_batismo'],
                 [Sequelize.fn('SUM', Sequelize.col('lider_celula')), 'total_lider_celula'],
                 [Sequelize.fn('SUM', Sequelize.col('disc_superv')), 'total_disc_superv'],
                 [Sequelize.fn('SUM', Sequelize.col('kids_incl')), 'total_kids_incl'],
                 [Sequelize.fn('SUM', Sequelize.col('intr_b_nt')), 'total_intr_b_nt'],
                 [Sequelize.fn('SUM', Sequelize.col('ant_test')), 'total_ant_test'],
                 [Sequelize.fn('SUM', Sequelize.col('batalha_esp')), 'total_batalha_esp'],
                 [Sequelize.fn('SUM', Sequelize.col('tetelestai')), 'total_tetelestai'],
                 [Sequelize.fn('SUM', Sequelize.col('vida')), 'total_vida'],
                 [Sequelize.fn('SUM', Sequelize.col('tsd')), 'total_tsd'],
                 [Sequelize.fn('SUM', Sequelize.col('discipulado')), 'total_discipulado'],           
                 
            ], 
                
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


