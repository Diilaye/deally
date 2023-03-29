const express = require('express');

// import all controllers

const transactionsCtrl = require('../controllers/transactions');


const routes = express.Router();

// Add routes
routes.get('/' ,transactionsCtrl.all);
routes.post('/' , transactionsCtrl.store);
routes.put('/' , transactionsCtrl.update);
routes.delete('/' ,transactionsCtrl.delete);

module.exports = routes;
