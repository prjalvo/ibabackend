import { db } from '../../../models';
var Sequelize = require("sequelize");
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { customerId, paymentmethod, orderId, deliveryAddress, product, grandTotal } = req.body;
            db.customer.findOne({ where: { id: customerId } })
                .then(p => {
                    if (p) {
                        return db.Order.create({
                            custId: customerId,
                            number: orderId,
                            grandtotal: grandTotal,
                            paymentmethod: paymentmethod
                        })
                    }
                    return res.status(500).json({ 'errors': ['User is not found'] });
                })
                .then((order) => {
                    if (order) {
                        return db.Address.create({
                            orderId: order.id,
                            custId: customerId,
                            fullname: deliveryAddress?deliveryAddress.name:'',
                            phone: deliveryAddress?deliveryAddress.phone:'',
                            discrict: deliveryAddress?deliveryAddress.discrict:'',
                            city: deliveryAddress?deliveryAddress.city:'',
                            states: deliveryAddress?deliveryAddress.states:'',
                            shipping: deliveryAddress?deliveryAddress.address:'',
                        }).then((p) => [order, p])
                    }
                })
                .then(([order, p]) => {
                    if (order) {
                        let cartEntries = [];
                        for (var i = 0; i < product.length; i++) {
                            cartEntries.push({
                                orderId: order.id,
                                addressId: p.id,
                                productId: product[i].id,
                                name: product[i].name,
                                qty: product[i].qty,
                                price: product[i].price,
                                total: product[i].total,
                                photo: product[i].photo,
                            })
                        }
                        return db.Cart.bulkCreate(cartEntries).then((r) => [r])
                    }
                })
                .then((success) => {
                    res.status(200).json({ 'success': true });
                })
                .catch(function (err) {
                    console.log(error);
                    res.status(500).json({ 'errors': ['Error adding cart'] });
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getAllOrderList(req, res, next) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if(req.query.limit != undefined){
            limit = parseInt(req.query.limit);
        }
        if(req.query.page != undefined){
            page = req.query.page;
            if(page < 1)
                page = 1;
        }
        if(req.query.sort){
            if(req.query.sort == 'name'){
                sort = ['name'];
            }
        }
        try {
            
            db.Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address }, { model: db.Cart }],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async statusUpdate(req, res, next) {
        try {
            const { id, status, deliverydate } = req.body;
            db.Order.findOne({ where: { id: id } })
                .then(list => {
                    return db.Order.update({
                        status: status,
                        deliverydate: deliverydate ? deliverydate : list.deliverydate
                    }, { where: { id: id } })
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated Status" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllOrderListById(req, res, next) {
        try {
            db.Order.findAll({
                where: { custId: req.body.id },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.Cart }] }],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
    async getAllOrderStatus(req, res, next) {
        try {
            db.Order.findAll({
                where: { status: req.body.status },
                order: [['createdAt', 'DESC']],                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
    async getAllOrderCount(req, res, next) {
        try {
            db.Order.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                group: ['status'],
                include: [{ model: db.Address, include: [{ model: db.Cart }] }],
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
    async getAllCargoCount(req, res, next) {
        try {
            db.user.findAll({
                attributes: ['id_cargo', [Sequelize.fn('COUNT', Sequelize.col('id_cargo')), 'total']],
                group: ['id_cargo'],
                include: [{ model: db.cargo, attributes: ["id", "descricao"], }]
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllGrupoCount(req, res, next) {
        try {
            db.grupos.findAll({
                attributes: ['id', [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],                                
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllMembroCount(req, res, next) {
        try {
            db.grupo_membros.findAll({
                attributes: ['id', [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],                                
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllFormularioCount(req, res, next) {
      
        try {
            db.formularios.findAll({
                attributes: ['id_celula',
                 [Sequelize.fn('SUM', Sequelize.col('membresia')), 'total_membresia'],                 
                 [Sequelize.fn('SUM', Sequelize.col('batismo')), 'total_batismo'],
                 [Sequelize.fn('SUM', Sequelize.col('lider_celula')), 'total_lider_celula'],
                 [Sequelize.fn('SUM', Sequelize.col('disc_superv')), 'total_disc_superv'],
                 [Sequelize.fn('SUM', Sequelize.col('kids_incl')), 'total_kids_incl'],
                 [Sequelize.fn('SUM', Sequelize.col('intr_b_nt')), 'total_intr_b_nt'],
                 [Sequelize.fn('SUM', Sequelize.col('ant_test')), 'total_ant_test'],
                 [Sequelize.fn('SUM', Sequelize.col('batalha_esp')), 'total_batalha_esp'],
                 [Sequelize.fn('SUM', Sequelize.col('tetelestai')), 'total_tetelestai'],
                 [Sequelize.fn('SUM', Sequelize.col('vida')), 'total_vida'],
                 [Sequelize.fn('SUM', Sequelize.col('tsd')), 'total_tsd'],
                 [Sequelize.fn('SUM', Sequelize.col('discipulado')), 'total_discipulado'],           
                 
            ],                                
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
}


