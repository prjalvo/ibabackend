import { db } from '../../../models/index.js';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { descricao,data_ini,fator,periodo,qtd } = req.body;
            db.cargo.findOne({ where: { descricao: descricao } })
                .then(data => {
                    if (data) {
                        return db.cargo.update({ descricao:descricao,data_ini:data_ini,fator:fator,periodo:periodo,qtd:qtd }, { where: { id: data.id } })
                    }
                    return db.cargo.create({ descricao: descricao,data_ini:data_ini,fator:fator,periodo:periodo,qtd:qtd})
                })
                .then(cargo => {
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
            db.cargo.findAll({attributes: ["id", "descricao","data_ini","fator","periodo","qtd"]})
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
    
    async getCargoListById(req, res, next) {
        try {
            db.cargo.findAll({
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


    async getcargoDelete(req, res, next) {
        try {
            db.cargo.findAll({ where: { id: parseInt(req.query.id) } })
            .then(cargo => {
                if (cargo) {
                    return db.cargo.destroy({ where: { id: parseInt(req.query.id)  } })
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

    async getcargoUpdate(req, res, next) {
        try {
            const{ id,descricao,data_ini,fator,periodo,qtd } = req.body
            db.cargo.findOne({ where: { id: parseInt(id) } })
            .then(cargo => {
                if (cargo) {
                    return db.cargo.update({
                        descricao: descricao,
                        data_ini: data_ini,
                        fator: fator,
                        periodo: periodo,
                        qtd: qtd
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


