import { db } from '../../../models';
const { Op } = require("sequelize");
import config from '../../../config';
import grupos from '../../../models/grupos';




export default {

    /* Add user api start here................................*/

    async addGrupo(req, res, next) {
        try {
            const { descricao,addres,status,id_tp_grupo,id_tp_ferramenta,id_lider,id_colider,id_supervisor,id_setor,id_area,id_distrito,info,dia_semana,faixa_etaria} = req.body;
            db.grupos.findOne({
                where: { descricao: descricao }
            })
                .then(grupos => {
                    if (!grupos) {
                        return db.grupos.create({
                            descricao: descricao,    
                            addres: addres,
                            status:status,
                            id_tp_grupo: id_tp_grupo,
                            id_tp_ferramenta: id_tp_ferramenta,
                            id_lider: id_lider,
                            id_colider: id_colider,
                            id_supervisor: id_supervisor,
                            id_setor: id_setor,
                            id_area: id_area,
                            id_distrito: id_distrito,
                            info:info,
                            dia_semana:dia_semana,
                            faixa_etaria:faixa_etaria,
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(grupo => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async getAllGrupoList(req, res, next) {
        try {
            db.grupos.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.tp_grupos, attributes: ["id", "descricao"] },
                { model: db.faixaetaria, attributes: ["id", "descricao"] },
                { model: db.tp_ferramentas, attributes: ["id", "descricao"] },
                { model: db.user, as:"user_lider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_colider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_supervisor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_setor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_area",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_distrito",attributes: ["id", "firstName"] }
            
               ],
                
            })
                .then(grupos => {
                    res.status(200).json({ 'success': true, grupos });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async getAllLider(req, res, next) {
        try {
            db.user.findAll({include: [{ model: db.cargo, attributes: ["id", "descricao"], }]})
            .then(user => {
                    res.status(200).json({ 'success': true, user });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    /*

    async getAllLider(req, res, next) {
        try {
            db.user.findAll({
                where: {
                     $and:[sequelize.literal('SELECT u.id,u.firstName,u.id_cargo,c.descricao from users u left join cargos c on u.id_cargo = c.id')]
                }
            })
            .then(user => {
                    res.status(200).json({ 'success': true, user });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
 */
    async update(req, res, next) {
        try {
            const { id,descricao,addres,status,id_tp_grupo,id_tp_ferramenta,id_lider,id_colider,id_supervisor,id_setor,id_area,id_distrito,info,dia_semana,faixa_etaria} = req.body;  
            db.grupos.findOne({ where: { id: id } })
                .then(grupos => {
                    if (grupos) {
                        return db.grupos.update({
                            descricao: descricao,  
                            addres: addres, 
                            status:status,
                            id_tp_grupo: id_tp_grupo.value ? id_tp_grupo.value : grupos.id_tp_grupo,
                            id_tp_ferramenta: id_tp_ferramenta.value ? id_tp_ferramenta.value : grupos.id_tp_ferramenta,
                            id_lider: id_lider.value ? id_lider.value : grupos.id_lider,
                            id_colider: id_colider.value ? id_colider.value : grupos.id_colider,
                            id_supervisor: id_supervisor.value ? id_supervisor.value : grupos.id_supervisor,
                            id_setor: id_setor.value ? id_setor.value : grupos.id_setor,
                            id_area: id_area.value ? id_area.value : grupos.id_area,
                            id_distrito: id_distrito.value ? id_distrito.value : grupos.id_distrito,
                            info: info,
                            dia_semana:dia_semana,
                            faixa_etaria:faixa_etaria.value ? faixa_etaria.value : grupos.faixa_etaria
                                                                           
                        }, { where: { id: grupos.id } })
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
    
    async getGrupoListById(req, res, next) {
        try {
            db.grupos.findAll({
                where: { id: req.query.id },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.tp_grupos, attributes: ["id", "descricao"] },
                { model: db.tp_ferramentas, attributes: ["id", "descricao"] },
                { model: db.faixaetaria, attributes: ["id", "descricao"] },
                { model: db.user, as:"user_lider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_colider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_supervisor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_setor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_area",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_distrito",attributes: ["id", "firstName"] }
            
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
            throw new RequestError('Error');
        }
    },

    async grupoDelete(req, res, next) {
        db.grupos.findOne({ where: { id: parseInt(req.query.id) } })
            .then(grupos => {
                if (grupos) {
                    return db.grupos.destroy({ where: { id: grupos.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },

    
    async getFilterbyGrupos(req, res, next) {
        try {
            let search = '%%';
            if (req.query.search) {
                search = '%' + req.query.search + '%';
            }
            db.grupos.findAll({
                attributes: ['id', 'descricao'],
                include: [{
                    model: db.grupos, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ descricao: { [Op.like]: search } }],
                    }
                }]
            })

                .then(grupos => {
                    res.status(200).json({ 'success': true, data: grupos });
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


