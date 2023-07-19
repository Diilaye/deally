const { Router }  = require('express');

// import all controllers
const restaurantCtrl = require('../controllers/restaurant');

const routes = new Router();

// Add routes
routes.get('/', restaurantCtrl.all);
routes.post('/', restaurantCtrl.store);

module.exports = routes;
