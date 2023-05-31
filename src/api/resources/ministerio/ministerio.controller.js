import { db } from '../../../models/index.js';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {           
            const { descricao } = req.body;
            db.ministerio.findOne({ where: { descricao: descricao } })
                .then(data => {
                    if (data) {
                        return db.ministerio.update({ descricao:descricao }, { where: { id: data.id } })
                    }
                    return db.ministerio.create({ descricao: descricao})
                })
                .then(ministerio => {
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
            db.ministerio.findAll({attributes: ["id", "descricao"]})
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
    
    async getMinisterioListById(req, res, next) {
        try {
            db.ministerio.findAll({
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


    async getministerioDelete(req, res, next) {
        try {
            db.ministerio.findAll({ where: { id: parseInt(req.query.id) } })
            .then(ministerio => {
                if (ministerio) {
                    return db.ministerio.destroy({ where: { id: parseInt(req.query.id)} })
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

    async getministerioUpdate(req, res, next) {
        try {
            const{ id,descricao } = req.body
            db.ministerio.findOne({ where: { id: parseInt(id) } })
            .then(ministerio => {
                if (ministerio) {
                    return db.ministerio.update({
                        id: id, descricao: descricao 
                    },{where: {id: ministerio.id}})
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


