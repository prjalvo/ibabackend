import { db } from '../../../models/index.js';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { descricao } = req.body;
            db.faixaetaria.findOne({ where: { descricao: descricao } })
                .then(data => {
                    if (data) {
                        return db.faixaetaria.update({ descricao:descricao }, { where: { id: data.id } })
                    }
                    return db.faixaetaria.create({ descricao: descricao})
                })
                .then(faixaetaria => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted location" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async List(req, res, next) {
        try {
            db.faixaetaria.findAll({attributes: ["id", "descricao"]})
            .then(list => {
                res.status(200).json({ 'success': true,data:list});
            })
            .catch(function (err) {
                next(err)
            });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    
    async getfaixaetariaListById(req, res, next) {
        try {
            db.faixaetaria.findAll({
                where: { id: req.query.id },             
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


    async getfaixaetariaDelete(req, res, next) {
        try {
            db.faixaetaria.findAll({ where: { id: parseInt(req.query.id) } })
            .then(faixaetaria => {
                if (faixaetaria) {
                    return db.faixaetaria.destroy({ where: { id: parseInt(req.query.id)  } })
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

    async getfaixaetariaUpdate(req, res, next) {
        try {
            const{ id,descricao } = req.body
            db.faixaetaria.findOne({ where: { id: parseInt(id) } })
            .then(faixaetaria => {
                if (faixaetaria) {
                    return db.faixaetaria.update({
                        descricao: descricao 
                    },{where: {id: parseInt(id)}})
                }
                throw new RequestError('No data found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "Update location Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },    
}


