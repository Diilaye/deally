const { Router }  = require('express');

// import all controllers
const restaurantCtrl = require('../controllers/restaurant');

const routes = new Router();

// Add routes
routes.get('/', restaurantCtrl.all);
routes.get('/one', restaurantCtrl.one);
routes.post('/', restaurantCtrl.store);
routes.put('/:id', restaurantCtrl.updatte);

module.exports = routes;
