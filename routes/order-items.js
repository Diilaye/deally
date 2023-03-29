const express = require('express');

// import all controllers

const itemOrderCtrl = require('../controllers/item-order');


const routes = express.Router();

// Add routes
routes.get('/' ,itemOrderCtrl.panierClient);
routes.get('/usine' ,itemOrderCtrl.orderUsine);
routes.get('/orderClient' ,itemOrderCtrl.orderClient);
routes.get('/orderShop' ,itemOrderCtrl.orderShop);
routes.get('/orderTransport' ,itemOrderCtrl.orderTransport);
routes.get('/:id' ,itemOrderCtrl.one);
routes.post('/' , itemOrderCtrl.store);
routes.put('/:id' , itemOrderCtrl.update);
routes.delete('/:id' ,itemOrderCtrl.delete);

module.exports = routes;
