const carModel =  require('../models/car.js');


const populateObject = [{
    path: 'cover',
    select: 'url',
}, {
    path: 'assuranceFile',
    select: 'url',
}, {
    path: 'licenceFile',
    select: 'url',
}];


exports.add = async (req ,res ,next)=> {

    
    
        try {

            const {
        
                cover,
                assuranceFile,
                licenceFile,
                categorie,
                longeur,
                largeur,
                hauteur,
                marque,
                matricule,
                model,
                carteGriseNumber,
                assuranceNumber,
                assurannceDate
            }  =  req.body;
        
                const  car  = carModel();
        
                car.cover  = cover;
                car.assuranceFile =assuranceFile;
                car.licenceFile = licenceFile;
                car.categorie  =  categorie;
                car.longeur =longeur;
                car.largeur =largeur;
                car.matricule =matricule;
                car.hauteur=hauteur;
                car.marque= marque;
                car.model  =model;
                car.carteGriseNumber  = carteGriseNumber;
                car.assuranceNumber  = assuranceNumber;
                car.assurannceDate  = assurannceDate;
                car.user = req.user.id_user;
        
                const carSave = await   car.save();
                console.log(carSave);
                const carFind =  await carModel.findById(carSave._id).populate(populateObject).exec();
        
                return  res.status(201).json({
                    message: 'car créeer avec success ',
                    status: 'OK',
                    data: carFind,
                    statusCode: 201
                });
            



        } catch (error) {
           return  res.json({
                message: 'Erreur création',
                statusCode: 404,
                data: error,
                status: 'NOT OK'
            });
        }




}

exports.all = async  (req, res , next) => {

    try {

        const  carFind = await  carModel.find({}).populate(populateObject).exec();
        
        return  res.status(200).json({
            message: 'car find avec success ',
            status: 'OK',
            data: carFind,
            statusCode: 200
        });

        
    } catch (error) {
        return  res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.one = async  (req, res , next) => {

    try {

        const  carFind = await  carModel.findById(req.params.id).populate(populateObject).exec();
        
        return  res.status(200).json({
            message: 'car find avec success ',
            status: 'OK',
            data: carFind,
            statusCode: 200
        });

        
    } catch (error) {
        return  res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allByUser = async (req,res,next )  => {

    try {

        const  carFind = await  carModel.find({
            user  : req.user.id_user
        }).populate(populateObject).exec();
        
        return  res.status(200).json({
            message: 'car find avec success ',
            status: 'OK',
            data: carFind,
            statusCode: 200
        });

        
    } catch (error) {
        return  res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }

}

exports.update = async (req,res , next) => {

   


    try {

        const  car = await carModel.findById(req.params.id).populate(populateObject).exec();

    console.log(car);
    console.log(req.params.id);

        const {
        
            cover,
            assuranceFile,
            licenceFile,
            categorie,
            longeur,
            largeur,
            hauteur,
            marque,
            matricule,
            model,
            carteGriseNumber,
            assuranceNumber,
            assurannceDate,
            enLigne
        }  =  req.body;

        if (cover != undefined) {

            car.cover  =  cover;
            
        }

        if (matricule != undefined) {

            car.matricule  =  matricule;
            
        }

        if (enLigne != undefined) {

            car.enLigne  =  enLigne;
            
        }

        if (assuranceFile != undefined) {

            car.assuranceFile  =  assuranceFile;
            
        }

        if (licenceFile != undefined) {

            car.licenceFile  =  licenceFile;
            
        }

        if (categorie != undefined) {

            car.categorie  =  categorie;
            
        }

        if (longeur != undefined) {

            car.longeur  =  longeur;
            
        }

        if (largeur != undefined) {

            car.largeur  =  largeur;
            
        }

        if (hauteur != undefined) {

            car.hauteur  =  hauteur;
            
        }

        if (marque != undefined) {

            car.marque  =  marque;
            
        }

        if (model != undefined) {

            car.model  =  model;
            
        }

        if (carteGriseNumber != undefined) {

            car.carteGriseNumber  =  carteGriseNumber;
            
        }

        if (assuranceNumber != undefined) {

            car.assuranceNumber  =  assuranceNumber;
            
        }

        if (assurannceDate != undefined) {

            car.assurannceDate  =  assurannceDate;
            
        }

        const  carSave  = await  car.save();

        const carFind = await  carModel.findById(carSave._id).populate(populateObject).exec();

        return  res.status(200).json({
            message: 'car update avec success ',
            status: 'OK',
            data: carFind,
            statusCode: 200
        });

        
    } catch (error) {
        return  res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}


exports.delete =  async (req,res  ,next)  => {
    try {
        
        const carFind = await  carModel.findById(req.params.id).populate(populateObject).exec();

        carFind.enLigne = "2";

        const carSave = await carFind.save();

        return  res.status(200).json({
            message: 'car delete avec success ',
            status: 'OK',
            data: carFind,
            statusCode: 200
        });
        
    } catch (error) {
        return  res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}