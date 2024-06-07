import { db } from '../../../models/index.js';
import { s3, bucket, upload } from "../../../middleware/bucket.js";

export default {
   async index(req, res, next) {
        try {
            const { texto,id_participante } = req.body;
            db.carta_vida.findOne({ where: { id_participante: -1 } })
                .then(data => {
                   return db.carta_vida.create({ texto:texto,id_participante:id_participante})
                })
                .then(carta_vida => {
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
    async getCartaListById(req, res, next) {
        try {
            db.carta_vida.findAll({
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


    async getcartaDelete(req, res, next) {
        try {
            db.carta_vida.findAll({ where: { id: parseInt(req.query.id) } })
            .then(carta_vida => {
                if (carta_vida) {
                    return db.carta_vida.destroy({ where: { id: parseInt(req.query.id)  } })
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

    async getcartaUpdate(req, res, next) {
        try {
            const{ id,url,texto,imprimiu,id_participante} = req.body
            db.carta_vida.findOne({ where: { id: parseInt(id) } })
            .then(carta_vida => {
                if (carta_vida) {
                    return db.carta_vida.update({
                        url:url,texto:texto,imprimiu:imprimiu,id_participante:id_participante
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


