const express = require('express');

// import all controllers

const deplacementCtrl = require('../controllers/deplacement-moto-voiture');


const routes = express.Router();

// Add routes
routes.get('/' ,deplacementCtrl.all);
routes.get('/byClient' ,deplacementCtrl.allByClient);
routes.get('/byDriver' ,deplacementCtrl.allByDriver);
routes.get('/:id' ,deplacementCtrl.one);
routes.post('/' , deplacementCtrl.store);
routes.put('/:id' , deplacementCtrl.update);
routes.put('/cancelClient/:id' , deplacementCtrl.cancelClient);
routes.put('/cancelDriver/:id' , deplacementCtrl.cancelDriver);
routes.delete('/:id' ,deplacementCtrl.delete);

module.exports = routes;
