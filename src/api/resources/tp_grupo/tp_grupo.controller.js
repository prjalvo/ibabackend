import { db } from '../../../models';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { descricao } = req.body;
            db.tp_grupos.findOne({ where: { descricao: descricao } })
                .then(data => {
                    if (data) {
                        return db.tp_grupos.update({ descricao:descricao }, { where: { id: data.id } })
                    }
                    return db.tp_grupos.create({ descricao: descricao})
                })
                .then(tp_grupos => {
                    res.status(200).json({ 'success': true, msg: "Tipo de grupo inserido com sucesso..." });
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
            db.tp_grupos.findAll({attributes: ["id", "descricao"]})
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
    
    async get_tp_grupoDelete(req, res, next) {       
        try {
          
            db.tp_grupos.findAll({ where: { id: parseInt(req.query.id) } })
            .then(tp_grupos => {
                if (tp_grupos) {
                    console.log("Passo2")
                    return db.tp_grupos.destroy({ where: { id: req.query.id } })
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

    async get_tp_grupoUpdate(req, res, next) {
        try {
            const{ id,descricao } = req.body
            db.tp_grupos.findOne({ where: { id: parseInt(id) } })
            .then(tp_grupos => {
                if (tp_grupos) {
                    return db.tp_grupos.update({
                        id: id, descricao: descricao 
                    },{where: {id: tp_grupos.id}})
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


