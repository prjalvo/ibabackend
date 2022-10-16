import { db } from '../../../models/index.js';


export default {

    /* Add user api start here................................*/

    async addGrupo(req, res, next) {
        try {
            const { id,nome, status,telefone,email,info,data_nascimento,id_ministerio } = req.body;
            db.grupo_membros.findOne({
                where: { email: email }
            })
                .then(grupo_membros => {
                    if (!grupo_membros) {
                        return db.grupo_membros.create({
                            nome: nome,    
                            telefone: telefone,
                            status:status,
                            email: email,
                            id_grupo: id,
                            info: info,
                            data_nascimento: data_nascimento,
                            id_ministerio: id_ministerio
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(grupo_membros => {
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

    
    async getAllComprometimentosList(req, res, next) {
   
        try {
            db.grupos.findAll({
                where: { id_lider: req.query.id_lider },
                order: [['createdAt', 'DESC']],         
                include: [{ model: db.tp_grupos, attributes: ["id", "descricao"] },
                { model: db.tp_ferramentas, attributes: ["id", "descricao"] },
                { model: db.user, as:"user_lider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_colider",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_supervisor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_setor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_area",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_distrito",attributes: ["id", "firstName"] } ]     
                
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

    async getAllComprometimentosListID(req, res, next) {  
        try {
            db.comprometimentos.findAll({
                where: { id_grupo: req.query.id_grupo,id_membro: req.query.id_membro },
                order: [['data', 'asc']],     
                include: [{ model: db.grupos, attributes: ["id", "descricao"] },
                { model: db.grupo_membros, attributes: ["id", "nome"] }             
            ]                      
                
            })
                .then(comprometimentos => {
                    res.status(200).json({ 'success': true, comprometimentos });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async update(req, res, next) {
        try {
            const { id_grupo,id_membro,data,evento,participou } = req.body;  
        
            db.comprometimentos.findOne(
                { where: { id_grupo:id_grupo,id_membro:id_membro,data:data,evento:evento} })
                .then(comprometimentos => {
                    if (comprometimentos) {
                        return db.comprometimentos.update({
                            participou: participou                          
                                                                           
                        }, { where: { id_grupo:id_grupo,id_membro:id_membro,data:data,evento:evento } })
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
    
    async getComprometimentosListById(req, res, next) {
        try {
            db.grupos.findAll({
                where: { id: req.query.id },
                include: [{ model: db.tp_grupos, attributes: ["id", "descricao"] },
                { model: db.tp_ferramentas, attributes: ["id", "descricao"] },
                { model: db.users, attributes: ["id", "firstName"] }],
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

    async Delete(req, res, next) {
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


