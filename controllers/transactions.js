const transactionModel = require('../models/transactions');

const orderid = require('order-id')('diikaanedevDeally');


exports.store = async (req, res ,next ) => {
    try {
        let { amount,order } = req.body ;

        const id = orderid.generate();

        
        const transaction = transactionModel();

        transaction.reference = orderid.getTime(id);
        transaction.token = id;
        transaction.amount = amount;
        transaction.client = req.user.id_user;
        transaction.order = order;


        const saveTransaction = await  order.save();

        return res.json({
            message: 'transactions crée avec succes',
            status: 'OK',
            data: saveTransaction,
            statusCode: 201
        })
    } catch (error) {
        res.json({
            message: 'Erreur creation',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
    
}

exports.all = async (req  , res ,next ) => {
    
    try {
        const transactions = await transactionModel.find(req.query).exec(); 
        res.json({
            message: 'transactions trouvée avec succes',
            status: 'OK',
            data: transactions,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'transaction non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const transaction = await transactionModel.findById(req.params.id).exec(); 
        res.json({
            message: 'transaction trouvée avec succes',
            status: 'OK',
            data: transaction,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'transaction non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { items ,price , status  } = req.body ;

    const transactions = transactionModel.findById(req.params.id).exec();

    if (items!=undefined) {
        transactions.items = items;
    }   

    if (price!=undefined) {
        transactions.price = price;
    }   

    if (status!=undefined) {
        transactions.status = status;
    }   
  
    transactions.save().then(result => {
        res.json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: result,
            statusCode: 200
        });
    }).catch(err => {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: err,
            status: 'NOT OK'
        });
    });



}

exports.delete = (req  , res ,next ) => transactionModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( error => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));