const restaurantModel = require('../models/restaurant');


require('dotenv').config({
    path: './.env'
});



const populateObject = [{
    path: 'adresse',
    populate : {
        path : 'point'
    }
} ,{
    path :'platRestaurants' ,
    populate :  {
        path  :'imagesPlats'
    }
  
}, {
    path  :'logo'
}, {
    path  :'imagesGallerie'
}];


exports.store  =  async (req,res , next)  => {
   
    

       try {
        let {
            adresse,
            name,
            typeCuisine,
            imagesGallerie,
            logo,
            description,
            heureDebut,
            heureFin
        }  = req.body;
    
        const restaurant  = restaurantModel();
    
        restaurant.adresse  = adresse;
        restaurant.name  = name;
        restaurant.user  = req.user.id_user;
        restaurant.typeCuisine  = typeCuisine;
        restaurant.imagesGallerie  = imagesGallerie;
        restaurant.logo  = logo;
        restaurant.description  = description;
        restaurant.heureDebut  = heureDebut;
        restaurant.heureFin  = heureFin;
    
        const  restaurantSave =await restaurant.save();
    
        const restaurantFind  = await restaurantModel.findById(restaurantSave._id).populate(populateObject).exec();
    
        return res.status(201).json({
            message: ' creation réussi',
            status: 'OK',
            data: restaurantFind,
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
         adresse,
         name,
         typeCuisine,
         imagesGallerie,
         logo,
         description,
         heureDebut,
         heureFin
     }  = req.body;
 
     const restaurant  = await restaurantModel.findById(req.params.id).exec();
 
     restaurant.adresse  = adresse;
     restaurant.name  = name;
     restaurant.user  = req.user.id_user;
     restaurant.typeCuisine  = typeCuisine;
     restaurant.imagesGallerie  = imagesGallerie;
     restaurant.logo  = logo;
     restaurant.description  = description;
     restaurant.heureDebut  = heureDebut;
     restaurant.heureFin  = heureFin;
 
     const  restaurantSave =await restaurant.save();
 
     const restaurantFind  = await restaurantModel.findById(restaurantSave._id).populate(populateObject).exec();
 
     return res.status(200).json({
         message: ' mise à jour réussi',
         status: 'OK',
         data: restaurantFind,
         statusCode: 200
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

exports.all = async (req, res, next) => {



    try {

        const restaurant = await restaurantModel.find(req.query).populate(populateObject).exec();

        return res.status(200).json({
            message: ' listage réussi',
            status: 'OK',
            data: restaurant,
            statusCode: 201
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

exports.one = async (req, res, next) => {

    
    const restaurant = await restaurantModel.findOne({
        user : req.user.id_user
    }).populate(populateObject).exec();

    try {

        const restaurant = await restaurantModel.findOne({
            user : req.user.id_user
        }).populate(populateObject).exec();

        return res.status(200).json({
            message: ' listage réussi',
            status: 'OK',
            data: restaurant,
            statusCode: 201
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