import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';


export default {
    async addBatismo(req, res, next) {
        const { nome, email, est_c, idade,telefone,celula,lider,supervisores, ne, turma } = req.body;       
        db.batismo.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
               // if (find) {
               //      throw new RequestError('Email is already in use', 409);
               //  }
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
    },   
    async getAllBatismoListById(req, res, next) {
        const { id } = req.body;
        console.log('batismo');
        console.log(req.body);
        db.batismo.findOne({ where: { id: id } })
            .then(batismo => {
                if (batismo) {
                    res.status(200).json({ 'success': true, data: batismo });
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "encontrado" });
            }).catch(err => {
                next(err)
            })
    },
    
    async deleteBatismoList(req, res, next) {
        db.batismo.findOne({ where: { id: req.body.id} })
            .then(data => {
                if (data) {
                    return db.batismo.destroy({ where: { id: req.body.id } }).then(r => [r, data])
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted userlist Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },
      async batismoUpdate(req,res,next){
        const {id, nome, email, est_c, idade,telefone,celula,lider,supervisores, ne, turma,curso,inscricao,reuniao,sexo,nome_conjuque,batizado,aspersao,nome_pai,nome_mae,
               estado,discipulado,url_diploma,blusa,tipo_curso,tem_celula,
               vida_vitoriosa,rede,url_foto,faixa,nome_lider,tel_lider,
               pais,uf,cidade,cep,rua,numero,complemento,bairro,nascimento,aceite
        } = req.body;        
        
        db.batismo.findOne({ where: { id: id }, paranoid: false })
            .then(batismo => {
                if (!batismo) {
                    throw new RequestError('User is not found', 409);
                }
                return db.batismo.update({
                    nome: nome ? nome : batismo.nome,                    
                    email: email ? email : batismo.email,
                    est_c: est_c ? est_c : batismo.est_c,               
                    idade: idade ? idade : batismo.idade,
                    telefone: telefone ? telefone : batismo.telefone,
                    celula: celula ? celula : batismo.celula,
                    lider: lider ? lider : batismo.lider,
                    supervisores: supervisores ? supervisores : batismo.supervisores,                    
                    ne: ne ? ne : batismo.ne,
                    turma: turma ? turma : batismo.turma,
                    curso: curso ? curso : batismo.curso,
                    inscricao: inscricao ? inscricao : batismo.inscricao,
                    reuniao: reuniao ? reuniao : batismo.reuniao,
                    sexo: sexo ? sexo : batismo.sexo,
                    nome_conjuque: nome_conjuque ? nome_conjuque : batismo.nome_conjuque,
                    batizado: batizado ? batizado : batismo.batizado ,
                    aspersao: aspersao ? aspersao : batismo.aspersao,
                    nome_pai: nome_pai ? nome_pai : batismo.nome_pai,
                    nome_mae: nome_mae ? nome_mae : batismo.nome_mae,
                    estado: estado ? estado : batismo.estado,
                    discipulado: discipulado ? discipulado : batismo.discipulado, 
                    url_diploma: url_diploma ? url_diploma : batismo.url_diploma, 
                    blusa: blusa ? blusa : batismo.blusa,
                    tipo_curso: tipo_curso ? tipo_curso : batismo.tipo_curso,
                    tem_celula: tem_celula ? tem_celula : batismo.tem_celula,
                    vida_vitoriosa: vida_vitoriosa ? vida_vitoriosa : batismo.vida_vitoriosa,
                    rede: rede ? rede : batismo.rede,
                    url_foto: url_foto ? url_foto : batismo.url_foto,
                    faixa: faixa ? faixa : batismo.faixa, 
                    nome_lider: nome_lider ? nome_lider : batismo.nome_lider,
                    tel_lider: tel_lider ? tel_lider : batismo.tel_lider,
                    pais: pais ? pais : batismo.pais,
                    uf: uf ? uf : batismo.uf,
                    cidade: cidade ? cidade : batismo.cidade,
                    cep: cep ? cep : batismo.cep,
                    rua: rua ? rua : batismo.rua,
                    numero: numero ? numero : batismo.numero,
                    complemento: complemento ? complemento : batismo.complemento,
                    bairro: bairro ? bairro : batismo.bairro,
                    nascimento: nascimento ? nascimento : batismo.nascimento,
                    aceite: aceite ? aceite : batismo.aceite
                }, { where: { id: id } })
            })
            .then(user => {
                if (user) {
                    return res.status(200).json({ success: true, msg: "User update successsfully"});
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

}
