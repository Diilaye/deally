const { Router }  = require('express');

// import all controllers
const addressCtrl = require('../controllers/address');

const routes = new Router();

// Add routes
routes.get('/', addressCtrl.all);
routes.get('/me', addressCtrl.allUser);
// routes.get('/meDefault', addressCtrl.allUserDefault);
routes.get('/:id', addressCtrl.one);
routes.post('/', addressCtrl.store);
routes.put('/:id', addressCtrl.update);
routes.delete('/:id', addressCtrl.delete);

module.exports = routes;
