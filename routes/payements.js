const express = require('express');

// import all controllers

const transactionsCtrl = require('../controllers/payements');


const routes = express.Router();

routes.post('/' , transactionsCtrl.addPayment);
routes.post('/ipn' , transactionsCtrl.paymentWH);
module.exports = routes;