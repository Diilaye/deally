const categorieModel = require('../models/categorie');

require('dotenv').config({
    path: './.env'
});


exports.store = async (req, res, next) => {



    try {

        let {title , parent , tiltleFrench , contry}  = req.body;

        const categorie = categorieModel();

        categorie.title = title ;

        categorie.contries = contry ;

        categorie.tiltleFrench = tiltleFrench ;

        if (parent!=undefined) {
            categorie.parent = parent ;
        }

        categorie.user_created = req.user.id_user ;


        const categorieSave = await categorie.save();

        res.json({
            message: ' creation réussi',
            status: 'OK',
            data:categorieSave,
            statusCode: 201
        });

    } catch (error) {

        res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}

exports.update = async (req, res, next) => {
    try {
        
        let {title , parent , tiltleFrench , contry}  = req.body;

        const categorie = categorieModel.findById(req.params.id);


        if (title!=undefined) {
            categorie.title = title;
        }

        if (contry!=undefined) {
            categorie.contry = contry;
        }

        if (tiltleFrench!=undefined) {
            categorie.tiltleFrench = tiltleFrench;
        }

        if (parent!=undefined) {
            categorie.parent = parent;
        }

     

        const updateCateorie = await categorie.save();

        res.json({
            message: ' mise à jour réussi',
            status: 'OK',
            data:updateCateorie,
            statusCode: 201
        });
        

    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}


exports.all = async  (req,res,next)=> {

    
    try {
        console.log(req.query.parent);
        const categories = await categorieModel.find({
            parent : {
                $exists: req.query.parent == undefined  ? false : true
        }}).populate('image contries').exec();
    
       return res.json({
            message: ' listage réussi',
            status: 'OK',
            data:categories,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allSonByContry = async  (req,res,next)=> {

    
    try {
        const categories = await categorieModel.find({
            parent : {
                $exists: true 
            }
        }).populate('image parent').sort({"title":1}).exec();
    
    
            const cat = categories.filter(e => {
                console.log('e',e);
                
                const obj = Object.assign(e.parent);
                console.log(obj.contries);
                if (obj.contries.includes(req.query.contry.toString())) {
                    return e;
                }
            });
        
           return res.json({
                message: ' listage réussi',
                status: 'OK',
                data:cat,
                statusCode: 201
            });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allParentByContry = async  (req,res,next)=> {

    
    try {
        const categories = await categorieModel.find({
            parent : {
                $exists: false 
            },
            
        }).populate('image').sort({"title":1}).exec();
    
    
            const cat = categories.filter(e => {
                console.log('e',e);
                
                const obj = Object.assign(e);
                if (obj.contries.includes(req.query.contry.toString())) {
                    return e;
                }
            });
        
           return res.json({
                message: ' listage réussi',
                status: 'OK',
                data:cat,
                statusCode: 201
            });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}






exports.allSon = async  (req,res,next)=> {

    
    try {
        
        const categories = await categorieModel.find({
            parent : req.query.category
        }).populate('image parent').sort({"title":-1}).exec();

        return res.json({
             message: ' listage réussi',
             status: 'OK',
             data:categories,
             statusCode: 201
         });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.one = async  (req,res,next)=> {
    try {

        const categorie = categorieModel.findOne(req.params.id).excec();

        res.json({
            message: ' listage réussi',
            status: 'OK',
            data:categorie,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.delete = async  (req,res,next)=> {
    try {

        const categorie = categorieModel.findOne(req.params.id).excec();

        const deleteCategorie = categorie.delete();

        res.json({
            message: ' supression réussi',
            status: 'OK',
            data:deleteCategorie,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}