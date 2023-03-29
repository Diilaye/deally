const addressModel = require('../models/address');
const pointModel  =  require('../models/point');

require('dotenv').config({
    path: './.env'
});


const populateObject = [{
    path: 'point',
}];


exports.store = async (req, res, next) => {

    console.log(req.body);
    
    


    try {


        let { lat, long, name } = req.body;

        const address = addressModel();

        const point  = pointModel();

        point.lat = lat  ;

        point.long = long ;
        
        point.name =name ;

        const poitnS= await point.save();

        address.point = poitnS._id;

        address.user = req.user.id_user;

        const addressSave = await address.save();

        const addressFind = await addressModel.findById(addressSave._id).populate(populateObject).exec();

        return res.status(201).json({
            message: ' creation réussi',
            status: 'OK',
            data: addressFind,
            statusCode: 201
        });

    } catch (error) {

        res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}

exports.update = async (req, res, next) => {
    
    try {

        let { lat, long, name} = req.body;

        const address =  await addressModel.findById(req.params.id).populate(populateObject).exec();
    
    
        // if (lat != undefined) {
        //     address.firstName = firstName;
        // }
    
        // if (lastName != undefined) {
        //     address.lastName = lastName;
        // }
    
        // if (livraisonOrFacture != undefined) {
        //     address.livraisonOrFacture = livraisonOrFacture;
        // }
    
        // if (isMap != undefined) {
        //     address.isMap = isMap;
        // }

        // if (isDefault != undefined) {
        //    await addressModel.updateMany({
        //         isDefault: true
        //     } , {
        //         isDefault : false
        //     });
            
        //     address.isDefault = isDefault;
        // }

    
        // if (phone != undefined) {
        //     address.phone = phone;
        // }
    
        // if (zipcode != undefined) {
        //     address.zipcode = zipcode;
        // }
    
        // if (country != undefined) {
        //     address.country = country;
        // }
    
        // if (city != undefined) {
        //     address.city = city;
        // }
    
        // if (addr2 != undefined) {
        //     address.addr2 = addr2;
        // }
    
        // if (addr1 != undefined) {
        //     address.addr1 = addr1;
        // }
    
        // if (name != undefined) {
        //     address.name = name;
        // }
    
        // if (product != undefined) {
    
        //     if (address.prodcuts.includes(product)) {
        //         address.prodcuts.push(product);
        //     }
        // }
    
        // const updateAddress = await address.save();
    
       return res.json({
            message: ' mise à jour réussi',
            status: 'OK',
            data: address,
            statusCode: 201
        });
    

    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}


exports.all = async (req, res, next) => {



    try {

        const address = await addressModel.find(req.query).exec();

        return res.json({
            message: ' listage réussi',
            status: 'OK',
            data: address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allUser = async (req, res, next) => {
   
    try {

        const address = await addressModel.find({
            user: req.user.id_user
        }).populate(populateObject).exec();
    
    
        return res.json({
            message: ' listage réussi',
            status: 'OK',
            data: address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allUserDefault = async (req, res, next) => {
   
    try {

        console.log(req.user.id_user);
        const address = await addressModel.find({
            user_created: req.user.id_user ,
            isDefault : true
        }).exec();
    
    
        return res.json({
            message: ' listage réussi',
            status: 'OK',
            data: address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.one = async (req, res, next) => {

    

    try {

        const address = await addressModel.findById(req.params.id);

        return res.json({
            message: ' listage réussi',
            status: 'OK',
            data: address,
            statusCode: 201
        });
        
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.delete = async (req, res, next) => {
    

        
    try {
        addressModel.findByIdAndDelete(req.params.id).then(result => {
            res.json({
                message: ' supression réussi',
                status: 'OK',
                data: result,
                statusCode: 201
            });
        }).catch(err=> {
            res.json({
                message: 'erreur mise à jour ',
                statusCode: 404,
                data: err,
                status: 'NOT OK'
            });
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}