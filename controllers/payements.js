const transactionModel = require('../models/transactions');

const OrderItemModel = require('../models/order-item');

const orderid = require('order-id')('diikaanedevDeally');

const paystack = require('paystack')('sk_test_1b23cbce38875af89d0032bfc3259966a32f3334');

const currencies = ["NGN", "GHS", "ZAR", "USD"];

exports.addPayment = async (req  , res ,next ) => {
    try {
        console.log(req.body);
        if (!req.body.email) {
            return  res.json({
                message: 'Missing Email',
                statusCode: 404,
                status: 'NOT OK',
            });
        }
        if (!req.body.amount) {
            return  res.json({
                message: 'Missing Amount',
                statusCode: 404,
                status: 'NOT OK',
            });
        }
        if (!req.body.currency || currencies.indexOf(req.body.currency) == -1) {
            return  res.json({
                message: 'Wrong Currency has to be in ["NGN", "GHS", "ZAR", "USD"]',
                statusCode: 404,
                status: 'NOT OK',
            });
        }
        const result = await paystack.transaction.initialize({email: req.body.email, amount: req.body.amount, currency: req.body.currency});

        const order = await  OrderItemModel.findOne({
            reference : req.body.reference
        }).exec();

        order.referencePay  = result['data']['reference'];

        await order.save();


        res.json({
            message: result.status == true ? 'Transaction réussi' : "Error",
            status: result.status == true ? 'OK' : 'NOT OK',
            data: result['data']['authorization_url'],
            statusCode: result.status == true ? 200 : 404
        });
    } catch (error) {
        console.log(error);
    }
    
}

exports.paymentWH = async (req  , res ,next ) => {
    try {
        console.log('WEBHOOK', req.body);
        const order = await OrderItemModel.findOne({
            referencePay : req.body.data.reference
        });
        if (req.body.event == 'charge.success') {
            console.log('reference', req.body.data.reference);
            console.log('Auth Code', req.body.data.authorization.authorization_code);
            // do DB action to validate order

            order.statusClient = "PAY";
            order.statusShop = "PAY";

        } else {
            // looks like payment has failed
            order.statusClient = "FAILED";
            order.statusShop = "FAILED";
        }

        await order.save();

        res.json({
            message: 'Webhook received',
            status: 'OK',
            data: {},
            statusCode: 200
        });
    } catch (error) {
        console.log(error);
    }
    
}