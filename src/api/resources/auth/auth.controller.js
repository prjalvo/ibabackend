import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import mailer from '../../../mailer.js';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js'

var JWTSign = function (user, date) {
    return JWT.sign({
        iss: config.name,
        sub: user.id,
        iam : user.type,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 480)
    }, config.secret);
}

function generateOtp() {
    let token = speakeasy.totp({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
    return token;
}

function verifyOtp(token) {
    let expiry = speakeasy.totp.verify({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        token: token,
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30))),
        window: 0
    });
    return expiry
}


export default {
    async addUser(req, res, next) {
        const { firstName, email, phone, id_cargo,id_distrito,id_area,id_setor,status, verify, role ,password,url_file } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        var token = generateOtp();
        var otp = verifyOtp(token);
        db.user.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.user.create({
                    firstName: firstName,                    
                    email: email,
                    phone: phone,               
                    id_cargo: id_cargo,
                    id_distrito: id_distrito,
                    id_area: id_area,
                    id_setor: id_setor,
                    status: status,                    
                    verify: verify,
                    role: role,
                    password: passwordHash,
                    url_file
                })

            })
            .then(user => {
                if (user) {
//                     mailer.sendEmployeePassword(email, token);
                    return res.status(200).json({ success: true, key: otp, msg: "New Registration added and password has been sent to " + email + " ." });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

    async findUser(req,res,next){
        db.user.findOne({ attributes:["firstName","lastName"], where: { email: req.query.email }, paranoid: false })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

     async getAllUserList(req,res,next){
        db.user.findAll({
            include: [{ model: db.cargo, attributes: ["id", "descricao"]},
                      { model: db.areas,as:"user_area",attributes: ["id", "descricao","tipo"]},
                      { model: db.areas,as:"user_setor",attributes: ["id", "descricao","tipo"]},
                      { model: db.areas,as:"user_distrito",attributes: ["id", "descricao","tipo"]}]
        })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

     async userUpdate(req,res,next){
        const { id, firstName, email, phone, id_cargo,id_distrito,id_area,id_setor, status, verify, role ,password,url_file } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        db.user.findOne({ where: { id: id }, paranoid: false })
            .then(user => {
                if (!user) {
                    throw new RequestError('User is not found', 409);
                }
                return db.user.update({
                    firstName: firstName ? firstName: user.firstName,
                    phone: phone ? phone: user.phone,
                    email: email ? email: user.email,
                    password: password ? passwordHash: user.passwordHash,              
                    role: role ? role: user.role,
                    verify : verify? verify: user.verify,
                    id_cargo: id_cargo ? id_cargo : user.id_cargo,
                    id_distrito: id_distrito ? id_distrito : user.id_distrito,
                    id_area: id_area ? id_area : user.id_area,
                    id_setor: id_setor ? id_setor : user.id_setor,                    
                    status: status ? status : user.status,
                    url_file: url_file ? url_file : user.url_file,
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

    async login(req, res, next) {
        var date = new Date();
        var token = JWTSign(req.user, date,{expiresIn: '12h' 
                         });
        res.cookie('XSRF-token',     token, {
            expire: new Date().setMinutes(date.getMinutes() + 480),
            httpOnly: true, secure: config.secure
        });
        
        return res.status(200).json({ success: true ,token,role: req.user.role,firstName: req.user.firstName,id_lider: req.user.id});
    },

     async deleteUserList(req, res, next) {
        db.user.findOne({ where: { id: req.body.id} })
            .then(data => {
                if (data) {
                    return db.user.destroy({ where: { id: req.body.id } }).then(r => [r, data])
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted userlist Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },
}




