const fournisseurModel = require('../models/fournisseur');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');



require('dotenv').config({
    path: './.env'
});


exports.store = async (req, res, next) => {



    try {
        const passwordCrypt = bcrytjs.hashSync(req.body.password, salt);

        const fournisseur = fournisseurModel();

        fournisseur.phone = req.body.phone;

        fournisseur.description = req.body.description;
        
        fournisseur.avatar = req.body.avatar;
        
        fournisseur.cover = req.body.cover;
        
        fournisseur.nameShop = req.body.nameShop;
        
        fournisseur.slogan = req.body.slogan;

        fournisseur.password = passwordCrypt;

        fournisseur.passwords = [passwordCrypt];

        const token = jwt.sign({
            id_user: fournisseur._id,
            roles_user: fournisseur.role,
            phone_user: fournisseur.phone
        }, process.env.JWT_SECRET, {
            expiresIn: '8784h'
        });

        fournisseur.token = token;

        const fournisseurSave = await fournisseur.save();

        res.json({
            message: 'Fournisseur creer avec succes',
            status: 'OK',
            data: {
                token,
                fournisseurSave
            },
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

exports.auth = async (req, res, _) => {

    try {

        let { phone , password} = req.body ;

        const fournisseur = await  fournisseurModel.findOne({
            phone
        }).exec();

        if (!fournisseur) {
            return res.json({
                message: 'Erreur identifiant',
                status: 'OK',
                data: null,
                statusCode: 200
            });
        }

        if (bcrytjs.compareSync(password, result.password)) {
            const token = jwt.sign({
                id_user: result.id,
                phone_user : result.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
            return res.json({
                message: 'Connection réussssi',
                status: 'OK',
                data: {
                    token ,
                    fournisseur 
                },
                statusCode: 200
            });
        }
        
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }


}

exports.findAuth = async (req, res, _) => {

    const fournisseur = await fournisseurModel.findById(req.user.id_user).exec();

    console.log(user);

    res.json({  
        message: 'user connectée ',
        data: {
            token: req.token,
            fournisseur
        },
        status: 'OK',
        statusCode: 200
    });

}

exports.update = async (req, res, next) => {
    try {
        const auth = await fournisseurModel.findById(req.user.id_user);

        if (req.body.phone != undefined) {
            auth.phone = req.body.phone;
        }
        if (req.body.password != undefined) {
            if (bcrytjs.compareSync(req.body.password, auth.password)) {
                const passwordCrypt = bcrytjs.hashSync(req.body.newPassword, salt);
                auth.passwords = auth.password.push(passwordCrypt);
                auth.password = passwordCrypt;
            }

        }

        if (req.body.role != undefined) {

            auth.role = role;

        }

        const token = jwt.sign({
            id_user: auth._id,
            role_user: auth.role,
            phone_user: auth.phone
        }, process.env.JWT_SECRET, {
            expiresIn: '8784h'
        });

        // auth.save();

        res.json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: {
                token,
                phone: auth.phone,
                role: auth.role
            },
            statusCode: 200
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

exports.delete = (req, res, next) => fournisseurModel.findByIdAndDelete(req.user.id_user).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: null,
        statusCode: 200
    });
}).catch(err => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));