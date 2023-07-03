import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';


export default {
    async addBatismo(req, res, next) {
        const { nome, email, est_c, idade,telefone,celula,lider,supervisores, ne, turma } = req.body;       
        db.batismo.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.batismo.create({
                    nome: nome,                    
                    email: email,
                    est_c: est_c,               
                    idade: idade,
                    telefone: telefone,
                    celula: celula,
                    lider: lider,
                    supervisores: supervisores,                    
                    ne: ne,
                    turma: turma                    
                })

            })
            .then(batismo => {
                if (batismo) {//                
                    return res.status(200).json({ success: true, msg: "New Registration added" });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },  
    
     async getAllBatismoList(req,res,next){
        db.batismo.findAll({            
        })
        .then(batismo => {
            if (batismo) {
                return res.status(200).json({ success: true, data:batismo});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    }

}
