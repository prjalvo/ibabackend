import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';


export default {
    async addencontrista(req, res, next) {
        // const { nome, tipo_documento, numero_documento, email, codigo_inscricao, status, cancelada, 
        //        data_inscricao, valor, categoria, cupom, forma_pagamento, quantidade_parcelas, nome_lider, 
        //        telefone_lider, numero_lider, complemento_lider, bairro_lider, cidade_lider, cep_lider, 
        //        telefone_Fixo, outro_telefone, membro_IBA, participa_Celula, endereco, quem_inscricao, 
        //        email_quem, tipo_documento_quem, num_doc_quem, ciente, nome_Pai, email_Pai, telefone_Pai, 
        //        idade_no_Evento, data_Nascimento, membro_IBA_PAI, pertence_igreja, email_mae, 
        //        telefone_Mae, nome_crianca, tipo_Sanguineo, idade, nome_mae, sexo, contato, alergico, 
        //        medicamento, restricao, necessidade, rede, url_doc, quem_inscricao2, email_inscricao, 
        //        tipo_doc_inscricao, doc_inscricao, checkin, nome_inscricao_lider, codigo_inscricao_lider, 
        //        email_inscricao_lider } = req.body;    
        console.log(req.body)
        const {
            'Nome': nome,
            'Tipo do documento': tipo_documento,
            'Número do documento': numero_documento,
            'Email': email,
            'Código da inscrição': codigo_inscricao,
            'Status': status,
            'Cancelada?': cancelada,
            'Data da inscrição': data_inscricao,
            'Valor': valor,
            'Categoria': categoria,
            'Cupom': cupom,
            'Forma de pagamento': forma_pagamento,
            'Quantidade de parcelas': quantidade_parcelas,
            'Nome e telefone do líder de célula kids': nome_telefone_lider,
            'Endereço: número': endereco_numero,
            'Endereço: complemento': endereco_complemento,
            'Endereço: bairro': endereco_bairro,
            'Cidade': cidade,
            'CEP': cep,
            'Telefone Fixo': telefone_fixo,
            'Outro telefone': outro_telefone,
            'Membro da Igreja Batista Atitude': membro_IBA,
            'Participa de Célula': participa_celula,
            'Endereço completo da criança': endereco_completo_crianca,
            'Quem realizou a inscrição?': quem_realizou_inscricao,
            'E-mail de quem realizou a inscrição': email_quem_realizou,
            'Tipo do documento de quem realizou a inscrição': tipo_documento_quem_realizou,
            'Número do documento de quem realizou a inscrição': numero_documento_quem_realizou,
            'Você está ciente que a autorização dos Pais, enviaremos por e-mail para ser assinada e preenchida. Deve ser devolvida na administração kids até o dia 05/03. Ciente?': ciente,
            'Nome do Pai completo': nome_Pai,
            'E-mail do Pai': email_Pai,
            'Telefone Pai': telefone_Pai,
            'Idade na data do Evento': idade_no_Evento,
            'Data de Nascimento': data_Nascimento,
            'Membro da IBA: SEDE OU FILHA?': membro_IBA_PAI,
            'Você pertence a alguma igreja (Sim/Não)? Se sim, qual é o nome da igreja?': pertence_igreja,
            'E-mail da mãe': email_mae,
            'Telefone da Mãe': telefone_Mae,
            'Nome completo da criança': nome_completo_crianca,
            'Tipo Sanguíneo da criança': tipo_sanguineo_crianca,
            'Idade da criança': idade_crianca,
            'Nome da mãe completo': nome_mae_completo,
            'Sexo': sexo,
            'Na ausência do responsável, contatar (Nome e Telefone)': contato,
            'É alérgico? Especifique Tipo de Alergia?': alergico,
            'Faz uso de algum medicamento? Especifique o Medicamento': medicamento,
            'Possui alguma restrição alimentar? Qual?': restricao,
            'Possui Alguma necessidade específica? Se sim, qual tipo?': necessidade,
            'Rede': rede,
            'Anexar aqui documento da criança (RG ou Certidão de Nascimento)': url_doc,
            'Quem realizou a inscrição': quem_inscricao2,
            'Email de quem realizou a inscrição': email_inscricao,
            'Tipo do documento de quem realizou a inscrição': tipo_doc_inscricao,
            'Número do documento de quem realizou a inscrição': doc_inscricao,
            'Check-in em': checkin,
            'Nome da inscrição líder': nome_inscricao_lider,
            'Código da inscrição líder': codigo_inscricao_lider,
            'E-mail da inscrição líder': email_inscricao_lider
        } = req.body;
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
    
     async getAllencontrista(req,res,next){
        db.encontrista.findAll({            
        })
        .then(encontrista => {
            if (encontrista) {
                return res.status(200).json({ success: true, data:encontrista});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },   
    async getAllencontristaListById(req, res, next) {
        const { id } = req.body;
        db.encontrista.findOne({ where: { id: id } })
            .then(encontrista => {
                if (encontrista) {
                    res.status(200).json({ 'success': true, data: encontrista });
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "encontrado" });
            }).catch(err => {
                next(err)
            })
    },
    
    async deleteencontristaList(req, res, next) {
        db.encontrista.findOne({ where: { id: req.body.id} })
            .then(data => {
                if (data) {
                    return db.encontrista.destroy({ where: { id: req.body.id } }).then(r => [r, data])
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted userlist Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },
      async encontristaUpdate(req,res,next){
             const {id, nome, tipo_documento, numero_documento, email, codigo_inscricao, status, cancelada, 
               data_inscricao, valor, categoria, cupom, forma_pagamento, quantidade_parcelas, nome_lider, 
               telefone_lider, numero_lider, complemento_lider, bairro_lider, cidade_lider, cep_lider, 
               telefone_Fixo, outro_telefone, membro_IBA, participa_Celula, endereco, quem_inscricao, 
               email_quem, tipo_documento_quem, num_doc_quem, ciente, nome_Pai, email_Pai, telefone_Pai, 
               idade_no_Evento, data_Nascimento, membro_IBA_PAI, pertence_igreja, email_mae, 
               telefone_Mae, nome_crianca, tipo_Sanguineo, idade, nome_mae, sexo, contato, alergico, 
               medicamento, restricao, necessidade, rede, url_doc, quem_inscricao2, email_inscricao, 
               tipo_doc_inscricao, doc_inscricao, checkin, nome_inscricao_lider, codigo_inscricao_lider, 
               email_inscricao_lider } = req.body;             
        
        db.encontrista.findOne({ where: { id: id }, paranoid: false })
            .then(batismo => {
                if (!encontrista) {
                    throw new RequestError('Encontrista Não encontrado', 409);
                }
                return db.encontrista.update({
                    nome: nome ? nome : encontrista.nome,
                    tipo_documento: tipo_documento ? tipo_documento : encontrista.tipo_documento,
                    numero_documento: numero_documento ? numero_documento : encontrista.numero_documento,
                    email: email ? email : encontrista.email,
                    codigo_inscricao: codigo_inscricao ? codigo_inscricao : encontrista.codigo_inscricao,
                    status: status ? status : encontrista.status,
                    cancelada: cancelada ? cancelada : encontrista.cancelada,
                    data_inscricao: data_inscricao ? data_inscricao : encontrista.data_inscricao,
                    valor: valor ? valor : encontrista.valor,
                    categoria: categoria ? categoria : encontrista.categoria,
                    cupom: cupom ? cupom : encontrista.cupom,
                    forma_pagamento: forma_pagamento ? forma_pagamento : encontrista.forma_pagamento,
                    quantidade_parcelas: quantidade_parcelas ? quantidade_parcelas : encontrista.quantidade_parcelas,
                    nome_lider: nome_lider ? nome_lider : encontrista.nome_lider,
                    telefone_lider: telefone_lider ? telefone_lider : encontrista.telefone_lider,
                    numero_lider: numero_lider ? numero_lider : encontrista.numero_lider,
                    complemento_lider: complemento_lider ? complemento_lider : encontrista.complemento_lider,
                    bairro_lider: bairro_lider ? bairro_lider : encontrista.bairro_lider,
                    cidade_lider: cidade_lider ? cidade_lider : encontrista.cidade_lider,
                    cep_lider: cep_lider ? cep_lider : encontrista.cep_lider,
                    telefone_Fixo: telefone_Fixo ? telefone_Fixo : encontrista.telefone_Fixo,
                    outro_telefone: outro_telefone ? outro_telefone : encontrista.outro_telefone,
                    membro_IBA: membro_IBA ? membro_IBA : encontrista.membro_IBA,
                    participa_Celula: participa_Celula ? participa_Celula : encontrista.participa_Celula,
                    endereco: endereco ? endereco : encontrista.endereco,
                    quem_inscricao: quem_inscricao ? quem_inscricao : encontrista.quem_inscricao,
                    email_quem: email_quem ? email_quem : encontrista.email_quem,
                    tipo_documento_quem: tipo_documento_quem ? tipo_documento_quem : encontrista.tipo_documento_quem,
                    num_doc_quem: num_doc_quem ? num_doc_quem : encontrista.num_doc_quem,
                    ciente: ciente ? ciente : encontrista.ciente,
                    nome_Pai: nome_Pai ? nome_Pai : encontrista.nome_Pai,
                    email_Pai: email_Pai ? email_Pai : encontrista.email_Pai,
                    telefone_Pai: telefone_Pai ? telefone_Pai : encontrista.telefone_Pai,
                    idade_no_Evento: idade_no_Evento ? idade_no_Evento : encontrista.idade_no_Evento,
                    data_Nascimento: data_Nascimento ? data_Nascimento : encontrista.data_Nascimento,
                    membro_IBA_PAI: membro_IBA_PAI ? membro_IBA_PAI : encontrista.membro_IBA_PAI,
                    pertence_igreja: pertence_igreja ? pertence_igreja : encontrista.pertence_igreja,
                    email_mae: email_mae ? email_mae : encontrista.email_mae,
                    telefone_Mae: telefone_Mae ? telefone_Mae : encontrista.telefone_Mae,
                    nome_crianca: nome_crianca ? nome_crianca : encontrista.nome_crianca,
                    tipo_Sanguineo: tipo_Sanguineo ? tipo_Sanguineo : encontrista.tipo_Sanguineo,
                    idade: idade ? idade : encontrista.idade,
                    nome_mae: nome_mae ? nome_mae : encontrista.nome_mae,
                    sexo: sexo ? sexo : encontrista.sexo,
                    contato: contato ? contato : encontrista.contato,
                    alergico: alergico ? alergico : encontrista.alergico,
                    medicamento: medicamento ? medicamento : encontrista.medicamento,
                    restricao: restricao ? restricao : encontrista.restricao,
                    necessidade: necessidade ? necessidade : encontrista.necessidade,
                    rede: rede ? rede : encontrista.rede,
                    url_doc: url_doc ? url_doc : encontrista.url_doc,
                    quem_inscricao2: quem_inscricao2 ? quem_inscricao2 : encontrista.quem_inscricao2,
                    email_inscricao: email_inscricao ? email_inscricao : encontrista.email_inscricao,
                    tipo_doc_inscricao: tipo_doc_inscricao ? tipo_doc_inscricao : encontrista.tipo_doc_inscricao,
                    doc_inscricao: doc_inscricao ? doc_inscricao : encontrista.doc_inscricao,
                    checkin: checkin ? checkin : encontrista.checkin,
                    nome_inscricao_lider: nome_inscricao_lider ? nome_inscricao_lider : encontrista.nome_inscricao_lider,
                    codigo_inscricao_lider: codigo_inscricao_lider ? codigo_inscricao_lider : encontrista.codigo_inscricao_lider,
                    email_inscricao_lider: email_inscricao_lider ? email_inscricao_lider : encontrista.email_inscricao_lider
                }, { where: { id: id } })
            })
            .then(user => {
                if (user) {
                    return res.status(200).json({ success: true, msg: "Encontrista Atualizado com Sucesso"});
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
