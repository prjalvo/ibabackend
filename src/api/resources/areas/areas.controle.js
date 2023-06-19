import { db } from '../../../models/index.js';
export default {

    /* Add user api start here................................*/

   async index(req, res, next) {
        try {
            const { descricao,tipo } = req.body;
            db.areas.findOne({ where: { descricao: descricao } })
                .then(data => {
                    if (data) {
                        return db.areas.update({ descricao:descricao,tipo:tipo }, { where: { id: data.id } })
                    }
                    return db.areas.create({ descricao: descricao,tipo: tipo})
                })
                .then(areas => {
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
            db.areas.findAll({attributes: ["id", "descricao","tipo"]})
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
    
    async getareasListById(req, res, next) {
        try {
            db.areas.findAll({
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


    async getareasDelete(req, res, next) {
        try {
            db.areas.findAll({ where: { id: parseInt(req.query.id) } })
            .then(cargo => {
                if (cargo) {
                    return db.areas.destroy({ where: { id: parseInt(req.query.id)  } })
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

    async getareasUpdate(req, res, next) {
        try {
            const{ id,descricao,tipo} = req.body
            db.areas.findOne({ where: { id: parseInt(id) } })
            .then(areas => {
                if (areas) {
                    return db.areas.update({
                        descricao: descricao,
                        tipo: tipo 
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
