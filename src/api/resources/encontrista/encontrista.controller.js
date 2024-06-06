import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';


export default {
    async addencontrista(req, res, next) {
        const { nome, tipo_documento, numero_documento, email, codigo_inscricao, status, cancelada, 
               data_inscricao, valor, categoria, cupom, forma_pagamento, quantidade_parcelas, nome_lider, 
               telefone_lider, numero_lider, complemento_lider, bairro_lider, cidade_lider, cep_lider, 
               telefone_Fixo, outro_telefone, membro_IBA, participa_Celula, endereco, quem_inscricao, 
               email_quem, tipo_documento_quem, num_doc_quem, ciente, nome_Pai, email_Pai, telefone_Pai, 
               idade_no_Evento, data_Nascimento, membro_IBA_PAI, pertence_igreja, email_mae, 
               telefone_Mae, nome_crianca, tipo_Sanguineo, idade, nome_mae, sexo, contato, alergico, 
               medicamento, restricao, necessidade, rede, url_doc, quem_inscricao2, email_inscricao, 
               tipo_doc_inscricao, doc_inscricao, checkin, nome_inscricao_lider, codigo_inscricao_lider, 
               email_inscricao_lider } = req.body;       
        db.encontrista.findOne({ where: { nome: nome }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Criança já cadastrada', 409);
                }
                return db.encontrista.create({
                nome: nome,
                tipo_documento: tipo_documento,
                numero_documento: numero_documento,
                email: email,
                codigo_inscricao: codigo_inscricao,
                status: status,
                cancelada: cancelada,
                data_inscricao: data_inscricao,
                valor: valor,
                categoria: categoria,
                cupom: cupom,
                forma_pagamento: forma_pagamento,
                quantidade_parcelas: quantidade_parcelas,
                nome_lider: nome_lider,
                telefone_lider: telefone_lider,
                numero_lider: numero_lider,
                complemento_lider: complemento_lider,
                bairro_lider: bairro_lider,
                cidade_lider: cidade_lider,
                cep_lider: cep_lider,
                telefone_Fixo: telefone_Fixo,
                outro_telefone: outro_telefone,
                membro_IBA: membro_IBA,
                participa_Celula: participa_Celula,
                endereco: endereco,
                quem_inscricao: quem_inscricao,
                email_quem: email_quem,
                tipo_documento_quem: tipo_documento_quem,
                num_doc_quem: num_doc_quem,
                ciente: ciente,
                nome_Pai: nome_Pai,
                email_Pai: email_Pai,
                telefone_Pai: telefone_Pai,
                idade_no_Evento: idade_no_Evento,
                data_Nascimento: data_Nascimento,
                membro_IBA_PAI: membro_IBA_PAI,
                pertence_igreja: pertence_igreja,
                email_mae: email_mae,
                telefone_Mae: telefone_Mae,
                nome_crianca: nome_crianca,
                tipo_Sanguineo: tipo_Sanguineo,
                idade: idade,
                nome_mae: nome_mae,
                sexo: sexo,
                contato: contato,
                alergico: alergico,
                medicamento: medicamento,
                restricao: restricao,
                necessidade: necessidade,
                rede: rede,
                url_doc: url_doc,
                quem_inscricao2: quem_inscricao2,
                email_inscricao: email_inscricao,
                tipo_doc_inscricao: tipo_doc_inscricao,
                doc_inscricao: doc_inscricao,
                checkin: checkin,
                nome_inscricao_lider: nome_inscricao_lider,
                codigo_inscricao_lider: codigo_inscricao_lider,
                email_inscricao_lider: email_inscricao_lider             
                })

            })
            .then(encontrista => {
                if (encontrista) {//                
                    return res.status(200).json({ success: true, msg: "Encontrista Registrado com Sucesso" });
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
