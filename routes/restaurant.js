const { Router }  = require('express');

// import all controllers
const restaurantCtrl = require('../controllers/restaurant');

const routes = new Router();

// Add routes
routes.get('/', restaurantCtrl.all);
routes.get('/one', restaurantCtrl.one);
routes.get('/one-gerant', restaurantCtrl.oneGerant);
routes.get('/:id', restaurantCtrl.selectedRestaurant);
routes.post('/', restaurantCtrl.store);
routes.put('/:id', restaurantCtrl.update);

module.exports = routes;
