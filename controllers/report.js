const reportModel = require('../models/report-shop');

exports.store = async (req, res ,next ) => {
    try {
        let { description , shop_alerted  , product_alerted  } = req.body ;

        let user_alert = req.user.id;
        
        const report = reportModel({description, user_alert , shop_alerted  , product_alerted});

        const saveRepoort = await  client.save();

        return res.json({
            message: 'report crée avec succes',
            status: 'OK',
            data: saveRepoort,
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
        const reports = await reportModel.find(req.query).populate('user_alert product_alerted shop_alerted').exec(); 
        res.json({
            message: 'reports trouvée avec succes',
            status: 'OK',
            data: reports,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const report = await reportModel.findById(req.params.id).populate('user_alert product_alerted shop_alerted').exec(); 
        res.json({
            message: 'report trouvée avec succes',
            status: 'OK',
            data: client,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { description, user_alert , shop_alerted  , product_alerted  , is_treat  } = req.body ;

    const report = reportModel.findById(req.params.id).exec();

    if (description!=undefined) {
        report.description = description;
    }   
  

    if (user_alert !=undefined) {
        report.user_alert = user_alert;
    }

    if (shop_alerted!=undefined) {
        report.shop_alerted = shop_alerted;
    }

    if (product_alerted!=undefined) {
        report.product_alerted= product_alerted;   
    }

    if (is_treat!=undefined) {
        report.is_treat =  is_treat;  
    }

   

    report.save().then(result => {
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

exports.delete = (req  , res ,next ) => reportModel.findByIdAndDelete(req.params.id).then(result => {
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