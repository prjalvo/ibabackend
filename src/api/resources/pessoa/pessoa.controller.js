import { db } from '../../../models';
const { Op } = require("sequelize");
import config from '../../../config';



export default {

    /* Add user api start here................................*/

    async addPessoa(req, res, next) {
        try {
            const { id_pessoa,nome,email,celular,password_hash,role,status,id_cargo,id_lider,id_colider,id_supervisor,id_setor,id_area,id_distrito } = req.body;
            db.product.findOne({
                where: { email: email }
            })
                .then(pessoa => {
                    if (!pessoa) {
                        return db.pessoas.create({
                            id_pessoa:id_pessoa,
                            nome:nome,
                            email:email,
                            celular:celular,
                            password_hash:password_hash,
                            role:role,
                            status:status,
                            id_cargo:id_cargo,
                            id_lider:id_lider,
                            id_colider:id_colider,
                            id_supervisor:id_supervisor,
                            id_setor:id_setor,
                            id_area:id_area,
                            id_distrito:id_distrito
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(product => {
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

    
    async getAllPessoaList(req, res, next) {
        try {
            db.pessoas.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.cargos, attributes: ["id_cargo", "descricao"] }]
            })
                .then(pessoas => {
                    res.status(200).json({ 'success': true, pessoas });
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
            const { id_pessoa,nome,email,celular,password_hash,role,status,id_cargo,id_lider,id_colider,id_supervisor,id_setor,id_area,id_distrito } = req.body;
            db.pessoas.findOne({ where: { id_pessoa: id_pessoa } })
                .then(pessoas => {
                    if (pessoas) {
                        return db.pessoas.update({
                            id_pessoa:id_pessoa,
                            nome:nome,
                            email:email,
                            celular:celular,
                            password_hash:password_hash,
                            role:role,
                            status:status,
                            id_cargo: id_cargo ? id_cargo : pessoas.id_cargo,
                            id_lider:id_lider ? id_lider : pessoas.id_lider,
                            id_colider:id_colider ? id_colider : pessoas.id_colider,
                            id_supervisor:id_supervisor ? id_supervisor : pessoas.id_supervisor,
                            id_setor:id_setor ? id_setor : pessoas.id_setor,
                            id_area:id_area ? id_area : pessoas.id_area,
                            id_distrito:id_distrito ? id_distrito : pessoas.id_distrito,
                        }, { where: { id_pessoa: pessoa.id_pessoa } })
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
    
    async getPessoaListById(req, res, next) {
        try {
            db.pessoas.findAll({
                where: { id_pessoa: req.query.id_pessoa },
                include: [{ model: db.cargos, attributes: ["id_cargo", "descricao"] }],
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

    async pessoaDelete(req, res, next) {
        db.pessoas.findOne({ where: { id: parseInt(req.query.id_pessoa) } })
            .then(pessoas => {
                if (pessoas) {
                    return db.product.destroy({ where: { id_pessoa: pessoas.id_pessoa } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },

    
    async getFilterbyPessoa(req, res, next) {
        try {
            let search = '%%';
            if (req.query.search) {
                search = '%' + req.query.search + '%';
            }
            db.pessoas.findAll({
                attributes: ['id_cargo', 'descricao'],
                include: [{
                    model: db.pessoas, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ nome: { [Op.like]: search }, slemailug: { [Op.like]: search } }],
                    }
                }]
            })

                .then(pessoas => {
                    res.status(200).json({ 'success': true, data: pessoas });
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


