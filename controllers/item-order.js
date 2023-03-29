const itemOrerModel = require('../models/order-item');

const productModel = require('../models/product');

const authModel  = require('../models/auth');

const populateObject = [{
    path: 'product',
    populate :  [
        {
            path: 'category',
            select: 'title',
        }, {
            path: 'address',
        }, {
            path: 'images'
        }, {
            path: 'pack_price'
        }
    ]
},{
    path : 'livraison',
    populate :  {
        path :'point'
    }
},{
    path : 'usine',
    select :'address',
    populate  :  {
        path:'address',
        populate : {
            path:'point'
        }
    }
    
}];

exports.store = async (req, res ,next ) => {
    
   


    try {
        
        let {product   , quantite , priceTotal , typePaiment } = req.body ;

        console.log(req.body);

        const p  = await productModel.findById(product).exec();



        if (p) {

            const item = itemOrerModel();


            item.product = product ;

            item.quantite = quantite ;

            item.typePaiment = typePaiment  ;

            item.priceTotal = priceTotal ;
            
            if (typePaiment =="micro") {
                item.statusShop = "MICRO";
            }else {
                item.statusShop = "CREATE";

            }

            item.client = req.user.id_user ;

            item.shop = p.shop ;

            //TODO mettre shop sur orderId


        
            const saveItem = await  item.save();

            const saveItemFind = await itemOrerModel.findById(saveItem._id).populate(populateObject).exec();

        

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
        const items = await itemOrerModel.find(req.query).populate(populateObject).exec(); 
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
        const item = await itemOrerModel.findById(req.params.id).populate(populateObject).exec(); 
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
        const item = await itemOrerModel.find({
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
        const item = await itemOrerModel.find({
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

exports.orderShop = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerModel.find({
            shop : req.user.id_user
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
    let   { quantite , statusShop , statusClient   , pourcentage , usine } = req.body ;

    console.log(statusShop);
    

    const item = await  itemOrerModel.findById(req.params.id).populate(populateObject).exec();

    if (quantite!=undefined) {
        item.quantite = quantite;
    } 

    if (usine!=undefined) {
        item.usine = usine;
    } 

    if (statusShop != undefined) {
        
        item.statusShop = statusShop;
    } 

    if (statusClient!=undefined) {

        item.statusClient = statusClient;
    }  
    
    if (pourcentage!=undefined) {

        item.preparating_pourcentage = pourcentage;
    }  

       
    const itemSave = await item.save();

    if (statusShop =="PREPARING") {
        const  user = await authModel.findById(req.body.usine).exec();
        user.ordersItems.push(itemSave._id);
        const  userUpdate = await user.save();
    }

      return  res.status(200).json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: itemSave,
            statusCode: 200
        });
    



}

exports.delete = (req  , res ,next ) => itemOrerModel.findByIdAndDelete(req.params.id).then(result => {
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