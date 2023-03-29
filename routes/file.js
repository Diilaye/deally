const express = require('express');

const upload = require('../utils/multer-dii');

const auth = require('../midleweare/auth');

// import all controllers
const  fileCtrl =  require('../controllers/file');


const routes = new express.Router();

// Add routes
routes.get('/', fileCtrl.all);
routes.get('/:id', fileCtrl.one);
routes.post('/',auth,fileCtrl.store);
// routes.post('/all', auth,fileCtrl.storeAll);
// routes.put('/:id', fileCtrl.update);
routes.delete('/:id', fileCtrl.delete);

module.exports = routes;
    