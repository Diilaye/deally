const express = require('express');

// import all controllers

const categorieCtrl = require('../controllers/categorie');


const routes = express.Router();

// Add routes
routes.get('/son' ,categorieCtrl.allSon);
routes.get('/sonByContry' ,categorieCtrl.allSonByContry);
routes.get('/parentByContry' ,categorieCtrl.allParentByContry);
routes.get('/' ,categorieCtrl.all);

// routes.post('/' , categorieCtrl.store);
// routes.put('/' , categorieCtrl.update);
// routes.delete('/' ,categorieCtrl.delete);

module.exports = routes;
