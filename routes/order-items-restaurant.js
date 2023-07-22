const express = require('express');

// import all controllers

const itemOrderCtrl = require('../controllers/item-order-restaurant');


const routes = express.Router();

// Add routes
routes.get('/' ,itemOrderCtrl.panierClient);
routes.get('/orderClient' ,itemOrderCtrl.orderClient);
routes.get('/orderRestaurant' ,itemOrderCtrl.orderRestaurant);
routes.get('/:id' ,itemOrderCtrl.one);
routes.post('/' , itemOrderCtrl.store);
routes.put('/:id' , itemOrderCtrl.update);
routes.delete('/:id' ,itemOrderCtrl.delete);

module.exports = routes;
