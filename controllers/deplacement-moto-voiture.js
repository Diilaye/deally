const deplacementModel = require('../models/deplacement-moto-voiture');

const pointModel  = require('../models/point');

const someoneElseModel = require('../models/someone-else');

const populateDeplacement =  [ {
    path: 'user',
},{
    path : 'someoneElse',
    populate: {
        path: 'photo',
        select: 'url',

    }
},{
    path :'driver_cancel'
},{
    path :'driver'
},,{
    path :'pointDepart'
},{
    path :'pointArrive'
}]



exports.store = async (req, res ,next)  => {
    
   try {
    const  {
        typeDeplacement,price,moyenPaiement , latDepart,longDepart,nameDepart,latArrive,longArrive,nameArrive,someoneNom,someonePrenom, someonePhone,someonePhoto,someone,duree,distance    
    } = req.body; 

    const pointdepart  = pointModel();

    pointdepart.lat = latDepart  ;

    pointdepart.long = longDepart ;
    
    pointdepart.name =nameDepart ;

    const poitnD= await pointdepart.save();

    const pointArrive  = pointModel();

    pointArrive.lat = latArrive  ;
    
    pointArrive.long = longArrive ;
    
    pointArrive.name = nameArrive ;

    const poitnA= await pointArrive.save();

    const deplacement  = deplacementModel();

    deplacement.moyenDePaiement = moyenPaiement;
    
    deplacement.price = price;
    
    deplacement.user = req.user.id_user;
    
    deplacement.typeDeplacement = typeDeplacement;

    deplacement.pointDepart = poitnD._id;

    deplacement.duree = duree;
    
    deplacement.distance = distance;

    deplacement.pointArrive = poitnA._id;

    if (someone != undefined) {

        const someoneElse = someoneElseModel();

        someoneElse.nom = someoneNom;

        someoneElse.prenom =someonePrenom ;

        someoneElse.phone=someonePhone;

        someoneElse.photo= someonePhoto;

        const someoneSave  = await  someoneElse.save();

        deplacement.someoneElse = someoneSave._id;

    }

    const deplacementSave  = await deplacement.save();

    const depFind  = await  deplacementModel.findById(deplacementSave._id).populate(populateDeplacement).exec();

    return res.status(201).json({
        message: 'deplacement crée avec succes',
        status: 'OK',
        data: depFind,
        statusCode: 201
    })
   } catch (error) {
    return res.status(400).json({
        message: 'Erreur creation',
        status: 'OK',
        data: error,
        statusCode: 400
    })
   }


}

exports.one = async (req, res ,next)  => {
    try {
        
        const deplacements = await deplacementModel.findById(req.params.id).populate(populateDeplacement).exec();

        return res.status(200).json({
            message: 'listage deplacement avec succes',
            status: 'OK',
            data: deplacements,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
} 

exports.all = async (req, res ,next)  => {

    

    try {
        
        const deplacements = await deplacementModel.find({}).populate(populateDeplacement).exec();

        return res.status(200).json({
            message: 'listage deplacement avec succes',
            status: 'OK',
            data: deplacements,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

} 

exports.allByDriver = async (req,res,next) => {
    try {
        
        const deplacements = await deplacementModel.find({
            driver :  req.user.id_user
        }).populate(populateDeplacement).exec();

        return res.status(200).json({
            message: 'listage deplacement avec succes',
            status: 'OK',
            data: deplacements,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.allByClient = async (req,res,next) => {
    try {
        
        const deplacements = await deplacementModel.find({
            user : req.user.id_user
        }).populate(populateDeplacement).exec();

        return res.status(200).json({
            message: 'listage deplacement avec succes',
            status: 'OK',
            data: deplacements,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async (req, res ,next)  => {
    
   

    try {
        
        const  {
            typeDeplacement,price  
        } = req.body; 
    
        const deplacement  = deplacementModel.findById(req.params.id).exec();
    
        if (typeDeplacement  !=undefined) {
            deplacement.typeDeplacement = typeDeplacement;
        }
    
        if (price  !=undefined) {
            deplacement.price = price;
        }
    
        const deplacementUpdate = await  deplacement.save();

        return res.status(200).json({
            message: ' deplacement update avec succes',
            status: 'OK',
            data: deplacementUpdate,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

} 

exports.cancelClient = async (req,res,next) => {
    try {
        
        const  {
            justicatif,status,isTreat  
        } = req.body; 
    
        const deplacement  = deplacementModel.findById(req.params.id).exec();
    
        deplacement.justicatif  = justicatif;

        deplacement.status  = status;

        deplacement.isTreat  = isTreat;
    
        const deplacementUpdate = await  deplacement.save();

        return res.status(200).json({
            message: ' deplacement update avec succes',
            status: 'OK',
            data: deplacementUpdate,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.cancelDriver = async (req,res,next) => {
    try {
        
        const  {
            idDriver  
        } = req.body; 
    
        const deplacement  = deplacementModel.findById(req.params.id).exec();
    
        deplacement.driver_cancel = deplacement.driver_cancel.push(idDriver);
    
        const deplacementUpdate = await  deplacement.save();

        return res.status(200).json({
            message: ' deplacement update avec succes',
            status: 'OK',
            data: deplacementUpdate,
            statusCode: 200
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Erreur listage',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}
 
exports.delete = async (req,res, next)  => {
    try {
        const deplacement  = deplacementModel.findById(req.params.id).exec();
    
        const deplacementDelete = await  deplacement.delete();

        return res.status(200).json({
            message: ' deplacement delete avec succes',
            status: 'OK',
            data: deplacementDelete,
            statusCode: 200
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Erreur delete',
            status: 'OK',
            data: error,
            statusCode: 400
        }) 
    }
}

