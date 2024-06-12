import { db } from '../../../models/index.js';
import { s3, bucket, upload } from "../../../middleware/bucket.js";

export default {
   async index(req, res, next) {
        try {
            let { texto,id_participante,nome } = req.body;
             function removeHtmlTags(str) 
             {
               return str.replace(/<\/?[^>]+(>|$)/g, "");
             }

            // Remove HTML tags do campo texto
            texto = removeHtmlTags(texto);
           
            db.carta_vida.findOne({ where: { id_participante: -1 } })
                .then(data => {
                   return db.carta_vida.create({ texto:texto,id_participante:id_participante,remetente:nome})
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
                where: { id_participante: req.query.id },             
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
   async List(req, res, next) {
        try {
            db.carta_vida.findAll()
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
            const{ id,texto,imprimiu,id_participante,nome} = req.body
            db.carta_vida.findOne({ where: { id: parseInt(id) } })
            .then(carta_vida => {
                if (carta_vida) {
                    return db.carta_vida.update({
                        texto:texto ? texto : carta_vida.texto ,
                        imprimiu:imprimiu ? imprimiu : carta_vida.imprimiu,
                        id_participante:id_participante ? id_participante : carta_vida.id_participante,
                        remetente:nome ? nome : carta_vida.nome
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


