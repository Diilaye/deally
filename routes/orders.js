const express = require('express');

// import all controllers

const orderCtrl = require('../controllers/orders');


const routes = express.Router();

// Add routes
routes.get('/' ,orderCtrl.all);
routes.get('/byShop' ,orderCtrl.allByShop);
routes.get('/byClient' ,orderCtrl.allByClient);
routes.get('/:id' ,orderCtrl.one);
routes.post('/' , orderCtrl.store);
routes.put('/' , orderCtrl.update);
routes.delete('/' ,orderCtrl.delete);

module.exports = routes;
