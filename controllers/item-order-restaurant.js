const itemOrerRestaurantModel = require('../models/order-item-restaurant');

const restaurantModel = require('../models/restaurant');

const platsModel = require('../models/plats');

const authModel  = require('../models/auth');

const populateObject = [{
    path: 'platOrder',
    populate :[ {
        path  :'imagesPlats'
    },{
        path : "restaurants",
        populate : [{
            path :'adresse',
            populate : {
                path : 'point'
            }
        }]
    }]
    
}];

exports.store = async (req, res ,next ) => {
    
   
   


    try {

           
        
        let {
            platOrder,
    
            complements,
        
            quantite ,
        
            priceTotal  } = req.body ;
    
        console.log(req.body);
    
        const p  = await platsModel.findById(platOrder).exec();
    
    
    
        if (p) {
    
            const item = itemOrerRestaurantModel();
    
    
            item.platOrder = platOrder ;
    
            item.complements = complements ;
    
            item.quantite = quantite ;
    
            item.priceTotal = priceTotal ;
    
            item.client = req.user.id_user ;
    
            item.restaurant = p.restaurants ;
    
            //TODO mettre shop sur orderId
    
            const saveItem = await  item.save();
    
            const saveItemFind = await itemOrerRestaurantModel.findById(saveItem._id).populate(populateObject).exec();
    
        
    
            return res.status(201).json({
                message: 'item crée avec succes',
                status: 'OK',
                data: saveItemFind,
                statusCode: 201
            });
    
        }else {
            return res.status(400).json({
                message: 'Erreur creation',
                status: 'OK',
                data: "error",
                statusCode: 400
            })
        }
        

    } catch (error) {
        res.status(400).json({
            message: 'Erreur creation',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
    
}

exports.all = async (req  , res ,next ) => {
    
    try {
        const items = await itemOrerRestaurantModel.find(req.query).populate(populateObject).exec(); 
        res.status(200).json({
            message: 'items trouvée avec succes',
            status: 'OK',
            data: items,
            statusCode: 200
        })
    } catch (error) {
        res.status(400).json({
            message: 'items non trouvée',
            status: 'OK',
            data: err,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const item = await itemOrerRestaurantModel.findById(req.params.id).populate(populateObject).exec(); 
        res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        })
    } catch (error) {
        res.status(400).json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.panierClient = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerRestaurantModel.find({
            client : req.user.id_user,
            statusClient :  'PANNIER'
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.status(400).json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderUsine = async (req  , res ,next ) => {
   

    
    try {
    
        const user = await authModel.findById(req.user.id_user).populate({
            path  :'ordersItems',
            populate :populateObject
        }).exec();
    
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: user.ordersItems,
            statusCode: 200
        }) 
    } catch (error) {
        res.status(400).json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderTransport  =  async ( req, res ,next) =>  {

    try {
        const user = await  authModel.findById(req.user.id_user).exec();
        const item = await itemOrerModel.find({
            shop : {
                $in : user.societe_livraison
            },
            statusShop :"DEBUT_TRANSPORT"
        }).populate(populateObject).exec(); 

        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) ;

    } catch (error) {
        res.status(400).json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}


exports.orderClient = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerRestaurantModel.find({
            statusClient :  'CREATE',
            client : req.user.id_user
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.status(400).json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderRestaurant = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerRestaurantModel.find({
            restaurant : req.user.id_user
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderRestaurantByGerant = async (req  , res ,next ) => {
   
    try {

        const auth = await  authModel.findById(req.user.id_user).exec();
        
        const restaurantFind = await  restaurantModel.findOne({
            user  : auth.userParent
        }).exec();
         const item = await itemOrerRestaurantModel.find({
            restaurant : restaurantFind.id
        }).populate(populateObject).exec(); 

        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { quantite , price , statusClient  } = req.body ;

    

    const item = await  itemOrerRestaurantModel.findById(req.params.id).populate(populateObject).exec();

    if (quantite!=undefined) {
        item.quantite = quantite;
        item.priceTotal = price;
    } 

    if (statusClient!=undefined) {
        item.statusClient = statusClient;
    } 

    const itemSave = await item.save();

      return  res.status(200).json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: itemSave,
            statusCode: 200
        });
    



}

exports.delete = (req  , res ,next ) => itemOrerRestaurantModel.findByIdAndDelete(req.params.id).then(result => {
    res.status(200).json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( err => res.status(400).json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: err,
    status: 'NOT OK'
}));