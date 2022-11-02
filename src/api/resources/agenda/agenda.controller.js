import { db } from '../../../models/index.js';

export default {

    /* Add user api start here................................*/

    async addAgenda(req, res, next) {
        try {
            const { title,location,id_celula,id_lider,startDate,endDate,note,id} = req.body;
            console.log(title,location,id_celula,id_lider,startDate,endDate,note,id)
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
                        })                          

                    }     
                    return db.agendas.update({
                        title: title ? title : agenda.title,
                        location: location ? location : agenda.location,
                        id_celula: id_celula ? id_celula : agenda.id_celula,                            
                        id_lider: id_lider ? id_lider : agenda.id_lider,
                        startDate: startDate ? startDate : agenda.startDate,
                        endDate: endDate ? endDate : agenda.endDate,
                        note: note ? note : agenda.note,

                    }, { where: { id: id } })                 
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

    
    async getAllAgendaList(req, res, next) {
        try {
            db.agendas.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.grupos, attributes: ["id", "descricao"] },           
                { model: db.user, as:"user_lider",attributes: ["id", "firstName"] }, 
                { model: db.user, as:"user_colider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_supervisor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_setor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_area",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_distrito",attributes: ["id", "firstName"] }          
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
    
    
    async getAgendaDelete(req, res, next) {
        try {
            db.agendas.findAll({ where: { id: parseInt(req.query.id) } })
            .then(agenda => {
                if (agenda) {
                    return db.agendas.destroy({ where: { id: parseInt(req.query.id)  } })
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
