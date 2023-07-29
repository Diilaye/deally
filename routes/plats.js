const { Router }  = require('express');

// import all controllers
const platsCtrl = require('../controllers/plats');

const routes = new Router();

// Add routes
routes.get('/', platsCtrl.all);
// routes.get('/one', platsCtrl.one);
routes.post('/', platsCtrl.store);
routes.post('/gerant', platsCtrl.storePlatByGerant);
routes.put('/:id', platsCtrl.update);

module.exports = routes;
