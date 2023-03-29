const express = require('express');

// import all controllers

const commercantCtrl = require('../controllers/commarcant');

const authMidleweare = require('../midleweare/auth');

const routes = express.Router();

// Add routes
routes.get('/', authMidleweare ,commercantCtrl.findAuth);
routes.post('/', commercantCtrl.store);
routes.post('/auth', commercantCtrl.auth);
routes.put('/', authMidleweare , commercantCtrl.update);
routes.delete('/', authMidleweare ,commercantCtrl.delete);

module.exports = routes;
