import { db } from '../../../models/index.js';
import { Op } from 'sequelize';

export default {

    /* Add user api start here................................*/

    async addGrupo(req, res, next) {
        try {
            const { id,nome, status,telefone,email,info,data_nascimento,data_conversao,id_ministerio } = req.body;
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
                            data_conversao: data_conversao,
                            id_ministerio: id_ministerio
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(grupo_membros => {             
                   try {
                    db.sequelize.query('call calcula_datas()');
                   }
                    catch (err) {
                    throw new RequestError('Erro chamada calcula_datas');
                   }    
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
                include: [{ model: db.tp_ferramentas, attributes: ["id", "descricao"] },
                { model: db.user, as:"user_lider",attributes: ["id", "firstName"] },         
                { model: db.user, as:"user_supervisor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_setor",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_area",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_distrito",attributes: ["id", "firstName"] },
                { model: db.user, as:"user_rede",attributes: ["id", "firstName"] } 
                ]     
                
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

    async getAllGrupoMembrosListID(req, res, next) {
   
        try {
            db.grupo_membros.findAll({
                where: { id_grupo: req.query.id},
                order: [['createdAt', 'DESC']],     
                include: [{ model: db.ministerio, attributes: ["id", "descricao"] },                
                ],
            })
                .then(grupo_membros => {
                    res.status(200).json({ 'success': true, grupo_membros });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
  async getAllGrupoMembrosFormula(req, res, next) {
  try {
    const formularios = await db.formularios.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.grupo_membros,
          attributes: ["id", "nome", "telefone", "email", "data_conversao"]
        },
        {
          model: db.grupos,
          attributes: ["id", "descricao"],
          include: [
            {
              model: db.users,
              attributes: ["id_area", "id_setor", "id_distrito", "id_lider"],
              where: { id: db.sequelize.col('grupos.id_lider') },
              required: true,
              include: [
                {
                  model: db.areas,
                  attributes: ["descricao", "tipo"],
                  where: {
                    [Op.or]: [
                      { id: db.sequelize.col('users.id_area') },
                      { id: db.sequelize.col('users.id_distrito') },
                      { id: db.sequelize.col('users.id_setor') }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(200).json({ 'success': true, formularios });
  } catch (err) {
    console.error(err);
    next(err);
  }
},
    async update(req, res, next) {
        try {
            const { id,nome, status,telefone,email,info,data_nascimento,data_conversao,id_ministerio } = req.body;  
            db.grupo_membros.findOne({ where: { email:email } })
                .then(grupo_membros => {
                    if (grupo_membros) {
                        return db.grupo_membros.update({
                            nome: nome,    
                            telefone: telefone,
                            status:status,
                            email: email,
                            //id_grupo: id,
                            info: info,
                            data_nascimento: data_nascimento,
                            data_conversao: data_conversao,
                            id_ministerio: id_ministerio.value ? id_ministerio.value : grupo_membros.id_ministerio                           
                                                                           
                        }, { where: { id: grupo_membros.id } })
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


