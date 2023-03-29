const appelFonndModel = require('../models/appel-fond');
const shopModel  = require('../models/shop-profile');

const { uid } = require('uid');


exports.store = async (req, res, next) => {

    try {

        let {
            description,
            shop,
            paiement_method_type,
            paiement_type,
            number_bank,
            number_phone,
            price
        } = req.body;

        const shopVerif = await shopModel.findById(shop).exec();

        if ( parseInt( Object.assign(shopVerif).solde) > parseInt(price) ) {
            const callFunc = appelFonndModel();

            callFunc.description = description ;
            callFunc.shop = shop ;
            callFunc.paiement_method_type = paiement_method_type ;
            callFunc.paiement_type = paiement_type ;
            callFunc.reference = uid(50)  ;
            callFunc.number_bank = number_bank  ;
            callFunc.number_phone = number_phone  ;
            callFunc.price = price  ;
    
            const saveCallFund = await callFunc.save();
    
            res.status(201).json({
                message: 'creation appel de fond',
                statusCode: 201,
                data: saveCallFund,
                status: 'OK'
            });
        }else {
            res.status(404).json({
                message: 'Solde inferieur',
                statusCode: 404,
                data: error,
                status: 'NOT OK'
            })
        }

    } catch (error) {
        res.status(404).json({
            message: 'error creation',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        })
    }

}

exports.all = async (req ,res , next ) => {
    
    try {

        const callFunc = await appelFonndModel.find(req.query).populate('shop').exec();
        
        res.status(200).json({
            message: 'liste appel de fond',
            statusCode: 200,
            data: callFunc,
            status: 'OK'
        });


    } catch (error) {
        res.status(404).json({
            message: 'error listage',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        })
    }




}

exports.one = async (req, res , next ) => {
    try {

        const callFunc = await appelFonndModel.findById(req.params.id).populate('shop').exec();
        
        res.status(200).json({
            message: ' appel de fond',
            statusCode: 200,
            data: callFunc,
            status: 'OK'
        });


    } catch (error) {
        res.status(404).json({
            message: 'error listage',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        })
    }

}

exports.update = async (req, res ,next ) => {

    try {
        let { is_treat  } = req.body ;


    const appelFund = await appelFonndModel.findById(req.params.id).exec();

    appelFund.user_treat = req.user.id_user;

    if (is_treat) {
        appelFund.is_treat = is_treat;
    }

    const saveAppelFund = await appelFund.save();

    res.status(200).json({
        message: ' appel de fond modifier' ,
        statusCode: 200,
        data: saveAppelFund,
        status: 'OK'
    });
    } catch (error) {
        res.status(404).json({
            message: 'error mise à jour',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        })
    }


}