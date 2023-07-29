const platModel = require('../models/plats');
const restaurantModel = require('../models/restaurant');
const authModel  = require('../models/auth');


require('dotenv').config({
    path: './.env'
}); 

const populateObject = [ {
    path  :'imagesPlats'
},{
    path : "restaurants",
    populate : [{
        path :'adresse',
        populate : {
            path : 'point'
        }
    }]
}];


exports.store  =  async (req,res , next)  => {
   
    

       try {
        let {
            typeCuisine,
            imagesPlats,
            description,
            name,
            price,
            tempsDeCuisson,
            complementPlats
        }  = req.body;
    
        const plat  = platModel();

        const  restaurant =  await restaurantModel.findOne({
            user : req.user.id_user
        }).exec();
    


        plat.name  = name;
        plat.restaurants  =  restaurant._id ;
        plat.user  = req.user.id_user;
        plat.complementPlats  = complementPlats;
        plat.typeCuisine  = typeCuisine;
        plat.price  = price;
        plat.description  = description;
        plat.imagesPlats  = imagesPlats;
        plat.tempsDeCuisson  = tempsDeCuisson;
    
        const  platSave =await plat.save();
    
        const platFind  = await platModel.findById(platSave._id).populate(populateObject).exec();

        restaurant.platRestaurants.push(platSave._id);
        
        const restaurantSave =  await restaurant.save();
    
        return res.status(201).json({
            message: ' creation réussi',
            status: 'OK',
            data: platFind,
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

exports.storePlatByGerant  =  async (req,res , next)  => {
   
    

    try {
     let {
         typeCuisine,
         imagesPlats,
         description,
         name,
         price,
         tempsDeCuisson,
         complementPlats
     }  = req.body;
 
    const auth  =  await authModel.findById(req.user.id_user).exec();

     const plat  = platModel();

     const  restaurant =  await restaurantModel.findOne({
         user : auth.userParent
     }).exec();
 


     plat.name  = name;
     plat.restaurants  =  restaurant._id ;
     plat.user  = req.user.id_user;
     plat.complementPlats  = complementPlats;
     plat.typeCuisine  = typeCuisine;
     plat.price  = price;
     plat.description  = description;
     plat.imagesPlats  = imagesPlats;
     plat.tempsDeCuisson  = tempsDeCuisson;
 
     const  platSave =await plat.save();
 
     const platFind  = await platModel.findById(platSave._id).populate(populateObject).exec();

     restaurant.platRestaurants.push(platSave._id);
     
     const restaurantSave =  await restaurant.save();
 
     return res.status(201).json({
         message: ' creation réussi',
         status: 'OK',
         data: platFind,
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

exports.update  =  async (req,res , next)  => {
   
    

    
    try {
        let {
            typeCuisine,
            imagesPlats,
            description,
            name,
            price,
            tempsDeCuisson,
            complementPlats
        }  = req.body;
    
        const plat  = await platModel.findById(req.params.id).exec();
    
        plat.name  = name;
        plat.user  = req.user.id_user;
        plat.typeCuisine  = typeCuisine;
        plat.price  = price;
        plat.complementPlats  = complementPlats;
        plat.description  = description;
        plat.imagesPlats  = imagesPlats;
        plat.tempsDeCuisson  = tempsDeCuisson;
    
        const  platSave =await plat.save();
    
        const platFind  = await platModel.findById(platSave._id).populate(populateObject).exec();
    
        
    
        return res.status(200).json({
            message: ' mise à jour réussi',
            status: 'OK',
            data: platFind,
            statusCode: 200
        });
       } catch (error) {
        res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
       }


}

exports.all = async (req, res, next) => {



    try {

        const plats = await platModel.find(req.query).populate(populateObject).exec();

        return res.status(200).json({
            message: ' listage réussi',
            status: 'OK',
            data: plats,
            statusCode: 200
        });
    } catch (error) {
        res.status(404).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}