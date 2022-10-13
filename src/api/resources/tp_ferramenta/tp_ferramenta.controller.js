import { db } from '../../../models';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { descricao } = req.body;
            console.log("Passo0")           
            db.tp_ferramentas.findOne({ where: { descricao: descricao } })            
                .then(data => {
                    if (data) {
                        return db.tp_ferramentas.update({ descricao:descricao }, { where: { id: data.id } })
                    }
                    console.log("Passo")
                    return db.tp_ferramentas.create({ descricao: descricao})
                })
                .then(tp_ferramentas => {
                    res.status(200).json({ 'success': true, msg: "Tipo de Ferramenta inserids com sucesso..." });
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
            db.tp_ferramentas.findAll({attributes: ["id", "descricao"]})
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
    
    async get_tp_ferramentaDelete(req, res, next) {
        try {            
            db.tp_ferramentas.findAll({ where: { id: parseInt(req.query.id) } })
            .then(tp_ferramentas => {
                if (tp_ferramentas) {
                    return db.tp_ferramentas.destroy({ where: { id: parseInt(req.query.id)} })
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

    async get_tp_ferramentaUpdate(req, res, next) {
        try {
            const{ id,descricao } = req.body
            db.tp_ferramentas.findOne({ where: { id: parseInt(id) } })
            .then(tp_ferramentas => {
                if (tp_ferramentas) {
                    return db.tp_ferramentas.update({
                        id: id, descricao: descricao 
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


