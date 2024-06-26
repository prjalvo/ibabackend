import { db } from '../../../models/index.js';
import QueryTypes from 'sequelize';

export default {

    /* Add user api start here................................*/

    async addAgenda(req, res, next) {
        try {
            const { title,location,id_celula,id_lider,startDate,endDate,note,id,visita} = req.body;         
            db.agendas.findOne({
                where: { id: id }
            })
                .then(agenda => {
                    if (!agenda) {
                        return db.agendas.create({
                            title: title,
                            location: location,
                            id_celula: id_celula,
                            id_lider: id_lider,
                            startDate: startDate,
                            endDate: endDate,
                            note: note,
                            status: visita,                           
                        })  
                    }     
                })
                .then(agenda => {
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

    
    async getAgendaUpdate(req, res, next) {
        try {
            const { title,location,id_celula,id_lider,startDate,endDate,note,id,visita} = req.body;
         
            db.agendas.findOne({ where: { id: parseInt(id) } })
           .then(agendas => {
                if (agendas) {
                   return db.agendas.update({
                            title: title ? title : agendas.title,
                            location: location ? location : agendas.location,
                            id_celula: id_celula ? id_celula : agendas.id_celula,                            
                            id_lider: id_lider ? id_lider : agendas.id_lider,
                            startDate: startDate ? startDate : agendas.startDate,
                            endDate: endDate ? endDate : agendas.endDate,
                            note: note ? note : agendas.note,
                            status: visita,                            
                        }, { where: { id: parseInt(id) } }) 
                }           
            })
            .then(agendas => {
                return res.status(200).json({'msg':'success','status': "Update location Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },    
        async getAllAgendaList(req, res, next) {
        try {
            db.agendas.findAll({
                order: [['startDate', 'DESC']],
                include: [{ model: db.grupos, attributes: ["id", "descricao","id_lider","id_colider","id_supervisor","id_setor","id_area","id_distrito"] },           
                 { model: db.user, as: "user_lider", attributes: ["id", "firstName"], include: { model: db.cargo, attributes: ["id", "descricao"] } }      
               ],
                
            })
                .then(agenda => {
                    res.status(200).json({ 'success': true, agenda });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError(err);
        }
    },           
      async getVisita_Setor(req, res, next) {
        try {
            db.visita_setor.findAll()
                .then(visita_setor => {
                    res.status(200).json({ 'success': true, visita_setor });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError(err);
        }
    },           
     async getVisita_Area(req, res, next) {
        try {
            db.visita_area.findAll()
                .then(visita_area => {
                    res.status(200).json({ 'success': true, visita_area });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError(err);
        }
    },       
     async getVisita_Distrito(req, res, next) {
        try {
            db.visita_distrito.findAll()
                .then(visita_distrito => {
                    res.status(200).json({ 'success': true, visita_distrito });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError(err);
        }
    },           
    async getAgendaDelete(req, res, next) {
        try {
            db.agendas.findAll({ where: { id: parseInt(req.query.id) } })
            .then(agendas => {
                if (agendas) {
                    return db.agendas.destroy({ where: { id: parseInt(req.query.id)}})
                }
                throw new RequestError('location is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted location Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
}
