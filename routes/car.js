const express = require('express');

// import all controllers

const carCtrl = require('../controllers/car');


const routes = express.Router();

// Add routes
routes.get('/' ,carCtrl.all);
routes.get('/byUser' ,carCtrl.allByUser);
routes.get('/:id' ,carCtrl.one);
routes.post('/' , carCtrl.add);
routes.put('/:id' , carCtrl.update);
routes.delete('/:id' ,carCtrl.delete);

module.exports = routes;
