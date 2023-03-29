
const  { Router } =  require('express');

const authMiddleweare = require('../midleweare/auth');

// import all controllers
const productCtrl = require('../controllers/products');

const routes = new Router();

// Add routes
routes.get('/contry', productCtrl.allByConntry);
routes.post('/', authMiddleweare ,  productCtrl.store);
routes.get('/', productCtrl.all);
routes.get('/shop', authMiddleweare,  productCtrl.productsShop);
routes.get('/whole-saler', authMiddleweare,  productCtrl.wholeSaler);
routes.get('/categorie' ,  productCtrl.productByCategorie);
routes.get('/familly' ,  productCtrl.productByFam);
routes.get('/:id', productCtrl.one);
routes.put('/:id', productCtrl.update);
routes.delete('/:id', productCtrl.delete);

module.exports = routes;
