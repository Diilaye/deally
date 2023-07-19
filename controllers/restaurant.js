const restaurantModel = require('../models/restaurant');


require('dotenv').config({
    path: './.env'
});

const populateObject = [{
    path: 'adresse',
    populate : {
        path : 'point'
    }
},{
    path : 'platRestaurants',
}  , {
    path  :'logo'
}];


exports.store  =  async (req,res , next)  => {

       try {
        let {
            adresse,
            typeCuisine,
            imagesGallerie,
            logo,
            description,
            heureDebut,
            heureFin
        }  = req.body;

        const restaurant  = restaurantModel();

        restaurant.adresse  = adresse;
        restaurant.user  = req.user.id_user;
        restaurant.typeCuisine  = typeCuisine;
        restaurant.imagesGallerie  = imagesGallerie;
        restaurant.logo  = logo;
        restaurant.description  = description;
        restaurant.heureDebut  = heureDebut;
        restaurant.heureFin  = heureFin;

        const  restaurantSave =await restaurant.save();

        const restaurantFind  = await restaurantModel.findById(restaurantSave._id).populate(populateObject).excec();

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