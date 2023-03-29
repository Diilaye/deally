const productModel = require('../models/product');

const addressModel = require('../models/address');

const categorieModel = require('../models/categorie');

const packPriceModel = require('../models/pack_price');

const authModel = require('../models/auth');



const populateObject = [{
    path: 'category',
    select: 'title',
}, {
    path: 'address',
}, {
    path: 'images'
}, {
    path: 'pack_price'
}];


exports.store = async (req, res, next) => {



    try {

        const user = await authModel.findById(req.user.id_user).exec();


        let {
            images,

            name,

            pack_discounts,

            category,

            description,

            address,

            brand,

            condition_concervation,

            stock,

            quantite_per_article,

            publish_date } = req.body;

        console.log(images);


        const product = productModel();

        product.name = name;

        product.images = images;

        product.category = category;

        product.brand = brand;

        product.description = description;

        product.address = address;

        product.condition_concervation = condition_concervation;

        product.stock = stock;
        
        product.contry = user.conntry;

        product.quantite_per_article = quantite_per_article;

        product.publish_date = publish_date;

        product.shop = req.user.id_user;

        const tabPricePack = [];

        for (const iterator of pack_discounts) {

            const packPrice = packPriceModel();

            packPrice.min = iterator.min;

            packPrice.max = iterator.max;

            packPrice.price = iterator.price;

            const savePricePack = await packPrice.save();

            tabPricePack.push(savePricePack._id);
        }

        product.pack_price = tabPricePack;


        const saveProduct = await product.save();




        console.log(req.user.id_user);
        console.log(user);

        user.products.push(saveProduct._id);

        const u = await user.save();

        const pS = await productModel.findById(saveProduct._id).populate(populateObject).exec();


        return res.status(201).json({
            message: ' àjout réussi',
            status: 'OK',
            data: pS,
            statusCode: 201
        });



    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}


exports.all = async (req, res, next) => {

    try {

        const products = await productModel.find(req.query).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}

exports.allByConntry = async (req, res, next) => {
    
    try {

        const products = await productModel.find({
            contry : req.query.contry
        }).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}


exports.productByCategorie = async (req, res, next) => {
    try {

        let cat = req.query.cat;

        const tabsCat = cat.split('|');

        console.log(tabsCat);

        const products = await productModel.find({
            contry : req.query.contry
        }).populate(populateObject).exec();

        const tabProducts = products.filter(e => {

            const obj = Object.assign(e.category);
            console.log(obj._id.toString());
            if (tabsCat.includes(obj._id.toString())) {
                return e;
            }

        });

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: tabProducts,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.productByFam = async (req, res, next) => {

    

    
    try {

        const c = await categorieModel.find({
            parent: req.query.cat,
        }).exec();
    
        const cat = Object.assign(c);
    
        const categorieTabs = cat.map(e => e._id.toString());
    
        const products = await productModel.find({
            contry :  req.query.contry
        }).populate(populateObject).exec();
    
        let tabProducts = products.filter(e => {
    
            const obj = Object.assign(e.category);
            if (categorieTabs.includes(obj._id.toString())) {
                return e;
            }
    
        });
    
        tabProducts = tabProducts.filter(e => {
            const obj = Object.assign(e.pack_price);
           const objectPrice = Object.assign(obj[2]);
            console.log('objectPrice' ,objectPrice.price );
            if (req.query.min != undefined || req.query.max != undefined) {
                if (objectPrice.price >= (parseInt(req.query.min) * 100) && objectPrice.price <= (parseInt(req.query.max) * 100)  ) {
                    return e;
                }
            }else {
                return e ;
            }
            
        });
    
        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: tabProducts,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.productsShop = async (req, res, next) => {

    try {

        const products = await productModel.find({
            shop: req.user.id_user
        }).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}

exports.wholeSaler = async (req, res, next) => {

    try {

        const userFind = await authModel.findById(req.user.id_user).exec();
        
        
        const products = await productModel.find({
            shop: userFind.fournisseur[0]
        }).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}



exports.one = async (req, res, next) => {
    try {

        const products = await productModel.findById(req.params.id).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.update = async (req, res, next) => {
    try {

        const product = await productModel.findById(req.params.id).populate(populateObject).exec();

        let {

            images,

            name,

            pack_price,

            category,

            brand,

            description,

            address,

            condition_concervation,

            stock,

            quantite_per_article,

            publish_date
        } = req.body;

        if (images != undefined) {
            const tabImages = [];

            const result = await uploadFile(iterator);

            const file = filesModel();

            file.url = result.fileName;

            file.user = req.user.id;

            const saveFile = await file.save();

            tabImages.push(saveFile._id);

            product.images = images;
        }

        if (name != undefined) {
            product.name = name;
        }

        if (brand != undefined) {
            product.brand = brand;
        }


        if (pack_price != undefined) {

            const tabPricePack = [];

            for (const iterator of pack_price) {

                const packPrice = packPriceModel();

                packPrice.min = iterator.min;

                packPrice.max = iterator.max;

                packPrice.price = iterator.price;

                const savePricePack = await packPrice.save();

                tabPricePack.push(savePricePack._id);
            }

            product.pack_price = tabPricePack;

        }

        if (category != undefined) {
            product.category = category;
        }

        if (description != undefined) {
            product.description = description;
        }

        if (address != undefined) {
            product.address = address;
        }

        if (condition_concervation != undefined) {
            product.condition_concervation = condition_concervation;
        }

        if (stock != undefined) {
            product.stock = stock;
        }

        if (quantite_per_article != undefined) {
            product.quantite_per_article = quantite_per_article;
        }

        if (publish_date != undefined) {
            product.publish_date = publish_date;
        }

        const saveProduct = await product.save();

        return res.status(200).json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: saveProduct,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.delete = async (req, res, next) => {
    try {

        let { id } = req.params;

        const product = await productModel.findById(id).exec();

        const deleteProduct = await product.delete();

        return res.status(200).json({
            message: 'supreesion réussi',
            status: 'OK',
            data: deleteProduct,
            statusCode: 200
        });

    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}