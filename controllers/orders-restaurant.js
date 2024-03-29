const ordersModel = require('../models/order-restaurant');
const ordersItemsModel = require('../models/order-item-restaurant');
const SomeoneElseModel = require('../models/someone-else');
const orderid = require('order-id')('diikaanedevDeally');
var dateTime = require('node-datetime');

const populateObject =[{
    path : 'items', 
    populate  : [
        {
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
    
        }
    ]
   
} ,{
    path  :  'livraison'
},{
    path  :'someoneElse'
}];


exports.store = async (req, res, next) => {

   
    let { 
        items,

        price ,
    
    
        priceLivraison ,
        
        status,
    
        livraison,

        typePaiment ,
    
        typeLivraison ,

        someoneElse,
    
    } = req.body;

    const orderss = await ordersModel.find({}).exec();

    var dt = dateTime.create();

    dt.format('m/d/Y');

    var bd = new Date(dt.now()).toISOString().toString();

    var d = bd.split('-')[0].substring(2)+ bd.split('-')[1].substring(0)+ bd.split('-')[2].split('T')[0].substring(0) + (orderss.length+1)  ;

    const order = ordersModel();

    const id = orderid.generate();

    order.client = req.user.id_user;

    order.items = items;

    order.price = price;

    order.price = price;

    order.priceLivraison = priceLivraison;

    if (typeLivraison == "0") {
         order.livraison = livraison;
    } 

    order.typeLivraison = typeLivraison;


    if (someoneElse !=undefined) {

        const someone  = SomeoneElseModel();

        someone.nom =  someoneElse['nom'];

        someone.phone =  someoneElse['phone'];

        const someoneFind  = await someone.save();

        order.someoneElse = someoneFind._id;
    }

    order.reference = d;

    order.typePaiment =  typePaiment 


    const saveOrder = await order.save();

    console.log(saveOrder._id);


    for (const iterator of items) {

        const orderItems = await ordersItemsModel.findById(iterator).exec();

        console.log('orderItems');
        console.log(orderItems);
        

        orderItems.order = saveOrder._id;

        orderItems.statusClient =  "PAY";

        orderItems.livraison = livraison;

        orderItems.typePaiment =  typePaiment 

        orderItems.reference = d;
        
        // orderItems.referencePay = refPaid!=undefined ? refPaid : ""  ;

        const n = await orderItems.save();

    }

    const saveFind =  await ordersModel.findById(saveOrder._id).populate(populateObject).exec();

    return res.status(201).json({
        message: 'order crée avec succes',
        status: 'OK',
        data: saveFind,
        statusCode: 201
    })



    try {

        
        
       
        let { 
            items,
    
            price ,
        
        
            priceLivraison ,
            
            status,
        
            livraison,

            typePaiment ,
        
            typeLivraison ,

            someoneElse,
        
        } = req.body;
    
        const orderss = await ordersModel.find({}).exec();
    
        var dt = dateTime.create();
    
        dt.format('m/d/Y');
    
        var bd = new Date(dt.now()).toISOString().toString();
    
        var d = bd.split('-')[0].substring(2)+ bd.split('-')[1].substring(0)+ bd.split('-')[2].split('T')[0].substring(0) + (orderss.length+1)  ;
    
        const order = ordersModel();
    
        const id = orderid.generate();
    
        order.client = req.user.id_user;

        order.items = items;
    
        order.price = price;

        order.price = price;
    
        order.priceLivraison = priceLivraison;

        if (typeLivraison == "0") {
             order.livraison = livraison;
        } 

        order.typeLivraison = typeLivraison;


        if (someoneElse !=undefined) {

            const someone  = SomeoneElseModel();

            someone.nom =  someoneElse['nom'];

            someone.phone =  someoneElse['phone'];

            const someoneFind  = await someone.create();

            order.someoneElse = someoneFind._id;
        }
    
        order.reference = d;
    
        order.typePaiment =  typePaiment 
    
    
        const saveOrder = await order.save();
    
        console.log(saveOrder._id);
    
    
        for (const iterator of items) {
    
            const orderItems = await ordersItemsModel.findById(iterator).exec();
    
            console.log('orderItems');
            console.log(orderItems);
            
    
            orderItems.order = saveOrder._id;
    
            orderItems.statusClient =  "PAY";
    
            orderItems.livraison = livraison;
    
            orderItems.typePaiment =  typePaiment 
    
            orderItems.reference = d;
            
            // orderItems.referencePay = refPaid!=undefined ? refPaid : ""  ;
    
            const n = await orderItems.save();
    
        }
    
        const saveFind =  await ordersModel.findById(saveOrder._id).populate(populateObject).exec();
    
        return res.status(201).json({
            message: 'order crée avec succes',
            status: 'OK',
            data: saveFind,
            statusCode: 201
        })

    } catch (error) {
        res.status(404).json({
            message: 'Erreur creation',
            status: 'OK',
            data: error,
            statusCode: 404
        })
    }

}

exports.all = async (req, res, next) => {
    
    try {
        const orders = await ordersModel.find(req.query).populate(populateObject).exec();


        return  res.status(200).json({
              message: 'orders trouvée avec succes',
              status: 'OK',
              data: orders,
              statusCode: 200
          })

    } catch (error) {
        res.status(404).json({
            message: 'orders non trouvée',
            status: 'OK',
            data: error,
            statusCode: 404
        })
    }

}

exports.allByClient = async (req, res, next) => {

    try {
        const orders = await ordersModel.find({
            client: req.user.id_user
        }).populate(populateObject).exec();


        res.json({
            message: 'orders trouvée avec succes',
            status: 'OK',
            data: orders,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'orders non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}


exports.allByShop = async (req, res, next) => {

    try {
        const orders = await ordersModel.find(req.query).populate(populateObject).exec();

        const v = orders.filter(e => {

            if (e.items.length > 0) {
                const b = e.items.filter(el => {
                    if (el.product != null) {
                        return el;
                    }
                });
                e.items = b;
                return e;
            }
        });

        res.json({
            message: 'orders trouvées avec succes',
            status: 'OK',
            data: v.filter(e => {
                if (e.items.length > 0) {
                    return e;
                }
            }),
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'orders non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}

exports.one = async (req, res, next) => {
    try {
        const order = await ordersModel.findById(req.params.id).populate(populateObject).exec();
        res.json({
            message: 'order trouvée avec succes',
            status: 'OK',
            data: order,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'order non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async (req, res, next) => {
    let { items, price, status } = req.body;

    const order = ordersModel.findById(req.params.id).populate(populateObject).exec();

    if (items != undefined) {
        order.items = items;
    }

    if (price != undefined) {
        order.price = price;
    }

    if (status != undefined) {
        order.status = status;
    }

    order.save().then(result => {
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

exports.delete = (req, res, next) => ordersModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch(error => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));