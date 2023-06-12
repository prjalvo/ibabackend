import { db } from '../../../models/index.js';
import QueryTypes from 'sequelize';

export default {

    /* Add user api start here................................*/

    async addAgenda(req, res, next) {
        try {
            const { title,location,id_celula,id_lider,startDate,endDate,note,id,visitou} = req.body;         
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
                            status: visitou,
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
            const { title,location,id_celula,id_lider,startDate,endDate,note,id,visitou} = req.body;
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
                            status: visitou ? visitou : agendas.status,
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
                order: [['createdAt', 'DESC']],
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
async getVisit_Setor(req, res, next) {
  try {
    const query = "SELECT desc_nome,desc_cargo,desc_celula,id_lider,id_cargo,id_celula, SUM(CASE WHEN SUBSTR(mesano, -2) = '01' THEN visita ELSE 0 END) AS 'Jan',SUM(CASE WHEN SUBSTR(mesano, -2) = '02' THEN visita ELSE 0 END) AS 'Fev',SUM(CASE WHEN SUBSTR(mesano, -2) = '03' THEN visita ELSE 0 END) AS 'Mar',SUM(CASE WHEN SUBSTR(mesano, -2) = '04' THEN visita ELSE 0 END) AS 'Abr',SUM(CASE WHEN SUBSTR(mesano, -2) = '05' THEN visita ELSE 0 END) AS 'Mai',SUM(CASE WHEN SUBSTR(mesano, -2) = '06' THEN visita ELSE 0 END) AS 'Jun',SUM(CASE WHEN SUBSTR(mesano, -2) = '07' THEN visita ELSE 0 END) AS 'Jul',SUM(CASE WHEN SUBSTR(mesano, -2) = '08' THEN visita ELSE 0 END) AS 'Ago',SUM(CASE WHEN SUBSTR(mesano, -2) = '09' THEN visita ELSE 0 END) AS 'Sete',SUM(CASE WHEN SUBSTR(mesano, -2) = '10' THEN visita ELSE 0 END) AS 'Outu',SUM(CASE WHEN SUBSTR(mesano, -2) = '11' THEN visita ELSE 0 END) AS 'Nov',SUM(CASE WHEN SUBSTR(mesano, -2) = '12' THEN visita ELSE 0 END) AS 'Dez' FROM visit_supervisaos WHERE id_cargo IN (35, 33) GROUP BY desc_nome, desc_cargo, desc_celula, id_lider, id_cargo, id_celula";
    const results = await db.sequelize.query(query, { type: QueryTypes.SELECT,raw: true });
    res.status(200).json({ 'success': true, visita_setor: results[0] });
  } catch (err) {
    next(err);
  }
},       
async getVisit_area(req, res, next) {
  try {
    const query = "SELECT DESC_NOME,desc_cargo,desc_celula,id_lider,id_cargo,id_celula,SUM(CASE WHEN SUBSTR(mesano, -2) IN ('01', '02') THEN visita ELSE 0 END) AS 'JanFev',SUM(CASE WHEN SUBSTR(mesano, -2) IN ('03', '04') THEN visita ELSE 0 END) AS 'MarAbr',SUM(CASE WHEN SUBSTR(mesano, -2) IN ('05', '06') THEN visita ELSE 0 END) AS 'MaiJun',SUM(CASE WHEN SUBSTR(mesano, -2) IN ('07', '08') THEN visita ELSE 0 END) AS 'JulAgo',SUM(CASE WHEN SUBSTR(mesano, -2) IN ('09', '10') THEN visita ELSE 0 END) AS 'SetOut',SUM(CASE WHEN SUBSTR(mesano, -2) IN ('11', '12') THEN visita ELSE 0 END) AS 'NovDez' FROM visit_supervisaos WHERE id_cargo = 36 GROUP BY DESC_NOME, desc_cargo, desc_celula, id_lider, id_cargo, id_celula,mesano";
    const results = await db.sequelize.query(query, { type: QueryTypes.SELECT,raw: true });
    res.status(200).json({ 'success': true, visita_area: results });
  } catch (err) {
    next(err);
  }
},       
async getVisit_Distrito(req, res, next) {
  try {
    const query = "SELECT DESC_NOME,desc_cargo,desc_celula, id_lider,id_cargo,id_celula, SUM(CASE WHEN SUBSTR(mesano, -2) IN ('01', '02', '03') THEN visita ELSE 0 END) JanFevMar, SUM(CASE WHEN SUBSTR(mesano, -2) IN ('04', '05', '06') THEN visita ELSE 0 END) AbrMaiJun,    SUM(CASE WHEN SUBSTR(mesano, -2) IN ('07', '08', '09') THEN visita ELSE 0 END) JulAgoSet,    SUM(CASE WHEN SUBSTR(mesano, -2) IN ('10', '11', '12') THEN visita ELSE 0 END) AS OutNovDez FROM visit_supervisaos WHERE id_cargo = 34 GROUP BY DESC_NOME, desc_cargo, desc_celula, id_lider, id_cargo, id_celula";
    const results = await db.sequelize.query(query, { type: QueryTypes.SELECT,raw: true });
    res.status(200).json({ 'success': true, visita_distrito: results });
  } catch (err) {
    next(err);
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
