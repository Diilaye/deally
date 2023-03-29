const express = require('express');

// import all controllers

const fournisseurCtrl = require('../controllers/fournisseur');

const authMidleweare = require('../midleweare/auth');

const routes = express.Router();

// Add routes
routes.get('/', authMidleweare ,fournisseurCtrl.findAuth);
routes.post('/', fournisseurCtrl.store);
routes.post('/auth', fournisseurCtrl.auth);
routes.put('/', authMidleweare , fournisseurCtrl.update);
routes.delete('/', authMidleweare ,fournisseurCtrl.delete);

module.exports = routes;
