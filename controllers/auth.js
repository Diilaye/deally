const authModel = require('../models/auth');

const codePhoneModel = require('../models/code-phone');

const fileModel  =  require('../models/file');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

const { uid } = require('uid');

const StreamChat = require('stream-chat').StreamChat;

const axios = require('axios').default;

const axiosOrange = require('axios');

var dateTime = require('node-datetime');

var ObjectID = require('mongodb').ObjectID


require('dotenv').config({
    path: './.env'
});

// Define values.
const api_key = 'crwbkpad2e28'
const api_secret = 'cmnxknpmgkf4b2ru6m7wn6b8cgurnfsgwa3csqypbtbbsyf9rzfpn8mptts2xhu2'

// orange api 




exports.store = async (req , res , next) => {
    
    

    try {
        const passwordCrypt = bcrytjs.hashSync(req.body.password, salt);
        
        const auth = authModel() ;
  
        auth.phone = req.body.phone ;

        auth.email = req.body.email ;

        auth.nameShop = req.body.nameShop ;

        auth.firstName = req.body.firstName ;

        auth.lastName = req.body.lastName ;

        auth.posteSignataire = req.body.posteSignataire ;

        auth.avatar = req.body.avatar ;

        auth.cacName = req.body.cacName ;
        
        auth.cacNumber = req.body.cacNumber ;

        auth.role = req.body.role ;

        auth.TypeOfCompany = req.body.TypeOfCompany;

        auth.NameofIDCard  = req.body.NameofIDCard;

        auth.NumberfIDCard  = req.body.NumberfIDCard;

        auth.MaritalStatut  = req.body.MaritalStatut;

        auth.contry = req.body.contry;

        auth.city = req.body.city ;

        auth.hasAcceptedNewsletter = req.body.hasAcceptedNewsletter ;

        auth.nameShop = req.body.nameShop ;

        auth.address = [req.body.address] ;

        auth.sexe = req.body.sexe ;
    
        auth.password =  passwordCrypt ;

        auth.passwords = [passwordCrypt]

        auth.role = req.body.role;


    const token = jwt.sign({
        id_user: auth._id,
        roles_user : auth.role , 
        phone_user : auth.phone
    }, process.env.JWT_SECRET, { expiresIn: '8784h' });

    auth.token = token; 
   
    const authSave = await auth.save();
   
      // Initialize a Server Client
    //   const serverClient = StreamChat.getInstance( api_key, api_secret);
    //   // Create User Token
    //   const tokenStream = serverClient.createToken(authSave._id.toString());

    //   authSave.tokenStream = tokenStream ;

          
    return authSave.save().then(auth => {
        res.json({
            message: 'Client creer avec succes',
            status: 'OK',
            data: {
                role : authSave.role , 
                phone : authSave.phone , 
                token ,
            },
            statusCode: 201
        });

    }).catch(error => {
        res.status(404).json({
            message: 'Numéro de téléphone déjas existant',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    });
    
    } catch (error) {
    
        res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    
    }
}

exports.addWholeSeller = async (req,res,next)=> {

    

    try {
        const findUser = await authModel.findById(req.user.id_user).exec();

        const auth = authModel() ;
    
        const d =new Date();
    
        console.log('req.accessToken',req.accessToken);
        
    
        if (findUser) {
    
            const authFind = await  authModel.findOne({
                phone : req.body.phone
            }).exec();
            console.log('authFind',authFind);
            if (authFind!=null) {
                authFind.fournisseur.push(req.user.id_user);
                authFind.contry = req.body.contry;
                authFind.matricule.push("WH-"+findUser.nameShop+"-"+req.body.contry);
                const authSave = await authFind.save();
    
                var data = JSON.stringify({
                    "outboundSMSMessageRequest": {
                        "address": "tel:"+req.body.phone,
                        "senderAddress": "tel:+224626501651",
                        "senderName": "Deally" ,
                        "outboundSMSTextMessage": {
                        "message": "Votre fournisseur "+findUser.nameShop +" de Deally vous à inscrit comme grossite ."
                        }
                    }
                    });
            
                    var config = {
                    method: 'post',
                    url: 'https://api.orange.com/smsmessaging/v1/outbound/tel:+224626501651/requests',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Authorization': 'Bearer '+req.accessToken
                    },
                    data : data
                    };
            
                    axiosOrange(config)
                    .then(function (response) {
                        const obj = Object.assign(response.data);
                       return  res.status(201).json({
                            message: 'code envoyé avec success ',
                            status: 'OK',
                            data: authSave,
                            statusCode: 201
                        })
                    })
                    .catch(function (error) {
                       return res.status(404).json({
                            message: 'erreur envoie sms phone déjas utilisé ',
                            status: 'OK',
                            data: error,
                            statusCode: 404
                        })
                    });
    
    
            
                    
    
                
            } else {
                    
                    const passwordCrypt = bcrytjs.hashSync(findUser.nameShop+"@"+d.getFullYear().toString(), salt);
            
                    auth.phone = req.body.phone ;
    
                    auth.nameShop = req.body.nameShop ;
    
                    auth.firstName = req.body.firstName ;
    
                    auth.fournisseur = [req.user.id_user] ;
    
                    auth.lastName = req.body.lastName ;
    
                    auth.contry = req.body.contry;
    
                    auth.matricule.push("WH-"+findUser.nameShop+"-"+req.body.contry);
    
                    auth.role = "grossiste";
                
                    auth.password =  passwordCrypt ;
    
                    auth.passwords = [passwordCrypt];
    
                
                    const token = jwt.sign({
                        id_user: auth._id,
                        roles_user : auth.role , 
                        phone_user : auth.phone
                    }, process.env.JWT_SECRET, { expiresIn: '8784h' });
                
                    auth.token = token; 
    
                    const authSave = await auth.save();
    
                    var data = JSON.stringify({
                "outboundSMSMessageRequest": {
                    "address": "tel:"+req.body.phone,
                    "senderAddress": "tel:+224626501651",
                    "senderName": "Deally",
                    "outboundSMSTextMessage": {
                    "message": "Votre fournisseur "+findUser.nameShop +" de Deally vous à inscrit comme grossite  merci de vous connectez pour administer votre entrepôt avec ce mot de passe :"+findUser.nameShop+"@"+d.getFullYear().toString()
                    }
                }
                });
        
                var config = {
                method: 'post',
                url: 'https://api.orange.com/smsmessaging/v1/outbound/tel:+224626501651/requests',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+req.accessToken
                },
                data : data
                };
        
                axiosOrange(config)
                .then(function (response) {
                    const obj = Object.assign(response.data);
                    res.status(201).json({
                        message: 'code envoyé avec success ',
                        status: 'OK',
                        data: authSave,
                        statusCode: 201
                    })
                })
                .catch(function (error) {
                    res.status(404).json({
                        message: 'erreur envoie sms phone déjas utilisé ',
                        status: 'OK',
                        data: error,
                        statusCode: 404
                    })
                });
        
        
            }
            
            
        
    
        } else {
            
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  "erreur de creation user not found",
            status: 'NOT OK'
          });
        }
    } catch (error) {
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    }
   

   
}

exports.addUsine = async (req,res,next)=> {

    

    try {
        const findUser = await authModel.findById(req.user.id_user).exec();

        const auth = authModel() ;
    
        const d =new Date();
    
        console.log('req.accessToken',req.accessToken);
        
    
        if (findUser) {
    
            const authFind = await  authModel.findOne({
                phone : req.body.phone
            }).exec();
            console.log('authFind',authFind);
            const passwordCrypt = bcrytjs.hashSync(findUser.nameShop+"@"+d.getFullYear().toString(), salt);
                
            auth.phone = req.body.phone ;
    
            auth.nameShop = req.body.nameShop ;
    
            auth.firstName = req.body.firstName ;
    
            auth.fournisseur = [req.user.id_user] ;
    
            auth.lastName = req.body.lastName ;
    
            auth.address = req.body.address ;
    
            auth.contry = req.body.contry;
    
            auth.matricule.push("US-"+findUser.nameShop+"-"+req.body.contry);
    
            auth.role = "usine";
        
            auth.password =  passwordCrypt ;
    
            auth.passwords = [passwordCrypt];
    
        
            const token = jwt.sign({
                id_user: auth._id,
                roles_user : auth.role , 
                phone_user : auth.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
        
            auth.token = token; 
    
            const authSave = await auth.save();

            const authFd =  await authModel.findById(authSave._id).populate([
                {
                    path :"address",
                    populate : {
                        path: 'point',
                    }
                }
            ]).exec();
    
            var data = JSON.stringify({
        "outboundSMSMessageRequest": {
            "address": "tel:"+req.body.phone,
            "senderAddress": "tel:+224626501651",
            "senderName": "Deally" ,
            "outboundSMSTextMessage": {
            "message": "Votre etes "+findUser.nameShop +" de Deally vous à inscrit un gerant usine  merci de vous connectez pour administer votre entrepôt avec ce mot de passe :"+findUser.nameShop+"@"+d.getFullYear().toString()
            }
        }
        });
    
        var config = {
        method: 'post',
        url: 'https://api.orange.com/smsmessaging/v1/outbound/tel:+224626501651/requests',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+req.accessToken
        },
        data : data
        };
    
        axiosOrange(config)
        .then(function (response) {
            const obj = Object.assign(response.data);
            res.status(201).json({
                message: 'code envoyé avec success ',
                status: 'OK',
                data: authFd,
                statusCode: 201
            })
        })
        .catch(function (error) {
            res.status(404).json({
                message: 'erreur envoie sms phone déjas utilisé ',
                status: 'OK',
                data: error,
                statusCode: 404
            })
        });
        
        
    
        } else {
            
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  "erreur de creation user not found",
            status: 'NOT OK'
          });
        }
    } catch (error) {
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    }
   

   
}


exports.addCompagnieTransport = async (req,res,next)=> {

    
    
    try {
        
        const findUser = await authModel.findById(req.user.id_user).exec();

        const auth = authModel() ;
    
        const d =new Date();
    
        console.log('req.accessToken',req.accessToken);
        
    
        if (findUser) {
    
            const authFind = await  authModel.findOne({
                phone : req.body.phone
            }).exec();

            

            const passwordCrypt = bcrytjs.hashSync(findUser.nameShop+"@"+d.getFullYear().toString(), salt);
                
            auth.phone = req.body.phone ;
    
            auth.nameShop = req.body.nameShop ;
    
            auth.firstName = req.body.firstName ;
    
            auth.societe_livraison = [req.user.id_user] ;
    
            auth.lastName = req.body.lastName ;
    
            auth.address = req.body.address ;
    
            auth.contry = req.body.contry;
    
            auth.matricule.push("TR-"+findUser.nameShop+"-"+req.body.contry);
    
            auth.role = "transporteur";
        
            auth.password =  passwordCrypt ;
    
            auth.passwords = [passwordCrypt];
    
        
            const token = jwt.sign({
                id_user: auth._id,
                roles_user : auth.role , 
                phone_user : auth.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
        
            auth.token = token; 
    
            const authSave = await auth.save();


           return res.status(201).json({
                message: 'code envoyé avec success',
                status: 'OK',
                data: authSave,
                statusCode: 201
            });

        
        } else {
            
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  "erreur de creation user not found",
            status: 'NOT OK'
          });
        }

    } catch (error) {
        return res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    }
   

   
}



exports.getWholeSeller = async (req, res, next) => {
    
    try {
        const wholeSellers = await authModel.find({
            role : {
                $eq :  "grossiste"
            },
            fournisseur :{
                $elemMatch : {$eq:ObjectID(req.user.id_user)}
            }}).exec();
    
        return res.status(200).json({
            message: 'listes wholeseller  ',
            statusCode: 200,
            data: wholeSellers,
            status: 'OK'
          });
    } catch (error) {
       return res.status(404).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    }
}


exports.getTransporteur = async (req, res, next) => {
    
    try {
        const wholeSellers = await authModel.find({
            role : {
                $eq :  "transporteur"
            },
            societe_livraison :{
                $elemMatch : {$eq:ObjectID(req.user.id_user)}
            }}).exec();
    
        return res.status(200).json({
            message: 'listes societe de transport  ',
            statusCode: 200,
            data: wholeSellers,
            status: 'OK'
          });
    } catch (error) {
       return res.status(404).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    }
}


exports.getUsine = async (req, res, next) => {
    
    try {
        const transporteurs = await authModel.find({
            role : {
                $eq :  "usine"
            },
            fournisseur :{
                $elemMatch : {$eq:ObjectID(req.user.id_user)}
            }}).populate({
                path :"address",
                populate : {
                    path: 'point',
                }
            }).exec();
    
        return res.status(200).json({
            message: 'listes wholeseller  ',
            statusCode: 200,
            data: transporteurs,
            status: 'OK'
          });
    } catch (error) {
       return res.status(404).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    }
}

exports.auth = async  ( req, res ,_ ) => {
    if (req.body.phone != undefined) return authModel.findOne({
        phone : req.body.phone
    }).then(result => {
        console.log(result);
        if (bcrytjs.compareSync(req.body.password, result.password)) {
            const token = jwt.sign({
                id_user: result.id,
                role_user : result.role , 
                phone_user : result.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
            return res.json({
                message: 'Connection réussssi',
                status: 'OK',
                data: {
                    user : result ,
                    token : result.token
                },
                statusCode: 200
            });
        } else {
            return res.status(401).json({
                message: 'Identifiant   Incorrect',
                status: 'NOT OK',
                data:  error,
                statusCode: 401
            });
        }
    }).catch(error => {
        return res.status(401).json({
            message: 'Identifiant des  Incorrect',
            status: 'NOT OK',
            data: error,
            statusCode: 401
        });
    });
}

exports.authDashbord = async  ( req, res ,_ ) => {
    if (req.body.email != undefined) return authModel.findOne({
        email : req.body.email
    }).then(result => {
        console.log(result);
        if (bcrytjs.compareSync(req.body.password, result.password)) {
            const token = jwt.sign({
                id_user: result.id,
                role_user : result.role , 
                phone_user : result.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
            return res.json({
                message: 'Connection réussssi',
                status: 'OK',
                data: {
                    token ,phone: result.phone,role : result.role , 
                    token : result.token
                },
                statusCode: 200
            });
        } else {
            return res.json({
                message: 'Identifiant ff  Incorrect',
                status: 'NOT OK',
                data:  error,
                statusCode: 401
            });
        }
    }).catch(error => {
        return res.json({
            message: 'Identifiant des  Incorrect',
            status: 'NOT OK',
            data: error,
            statusCode: 401
        });
    });
}

exports.findAuth = async (req , res, _ ) =>  {

    const user = await authModel.findById(req.user.id_user).exec();

    console.log(user);

    res.json({ message: 'user connectée ', data: {
        token : req.token ,user : user
    } ,status: 'OK', statusCode: 200});

}

exports.update = async (req, res ,next ) => {

   
    
    try {
        console.log(req.body);

        const auth = await  authModel.findById(req.user.id_user);
            
        if (req.body.phone!=undefined) {
            auth.phone = req.body.phone ;
        }
        if (req.body.password !=undefined) {
            if (bcrytjs.compareSync(req.body.password, auth.password)) {
                const passwordCrypt = bcrytjs.hashSync(req.body.newPassword, salt);
                auth.passwords = auth.password.push(passwordCrypt);
                auth.password = passwordCrypt ;
            }
    
        }
    
    
        if (req.body.lastName !=undefined) {
            
            auth.lastName = req.body.lastName ;
    
        }
    
        if (req.body.firstName !=undefined) {
            
            auth.firstName = req.body.firstName ;
    
        }
    
        if (req.body.bvn !=undefined) {
            
            auth.bvn = req.body.bvn ;
    
        }
    
        if (req.body.cacNumber !=undefined) {
            
            auth.cacNumber = req.body.cacNumber ;
    
        }
    
        if (req.body.cacName !=undefined) {
            
            auth.cacName = req.body.cacName ;
    
        }
    
        if (req.body.role !=undefined) {
            
            auth.role = req.body.role ;
    
        }

        if (req.body.TypeOfCompany !=undefined) {
            
            auth.TypeOfCompany = req.body.TypeOfCompany;
    
        }

        if (req.body.NameofIDCard !=undefined) {
            
            auth.NameofIDCard = req.body.NameofIDCard;
    
        }

        if (req.body.NumberfIDCard !=undefined) {
            
            auth.NumberfIDCard = req.body.NumberfIDCard;
    
        }

        

        if (req.body.MaritalStatut !=undefined) {
            
            auth.MaritalStatut = req.body.MaritalStatut;
    
        }

        if (req.body.nameShop !=undefined) {
            
            auth.nameShop = req.body.nameShop;
    
        }

        if (req.body.avatar !=undefined) {

            const ava  =  await fileModel.findById(req.body.avatar).exec();
            
            auth.avatar = ava.url;
    
        }
        

    
        const userUpdate =await  auth.save();
    
    
        const token = jwt.sign({
            id_user: auth._id,
            role_user : auth.role , 
            phone_user : auth.phone
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });
    
    
        return res.json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: {token , phone : auth.phone , role : auth.role , user:userUpdate  },
            statusCode: 200
        });

    } catch (error) {
        res.status(404).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    
    }
}   

exports.delete = (req, res , next ) => authModel.findByIdAndDelete(req.user.id_user).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: null,
        statusCode: 200
    });
}).catch( err => res.status(404).json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));

exports.verifNumberValid = async (req, res , next) => {


    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;


    const phoneV = await authModel.findOne({
        phone :req.body.telSender
    })

    console.log('phoneV => ' , phoneV);
    
    if(phoneV==null) {
        const newCode = codePhoneModel();

        newCode.code = num;

        const s = await newCode.save();

        console.log('s => ', num);
        

        const updateCode = async () => {

            const i = await codePhoneModel.findById(s._id);

            i.is_treat = true;

            const j = await i.save();
        }

        setTimeout(updateCode, 180000);

        console.log('d =>' , num);
    


        var data = JSON.stringify({
        "outboundSMSMessageRequest": {
            "address": "tel:"+req.body.telSender,
            "senderAddress": "tel:+224626501651",
            "senderName": "Deally",
            "outboundSMSTextMessage": {
            "message": "Votre code de validation Deally est le suivant: "+num + "\n HxrjxBUsqpA"
            }
        }
        });

        var config = {
        method: 'post',
        url: 'https://api.orange.com/smsmessaging/v1/outbound/tel:+224626501651/requests',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+req.accessToken
        },
        data : data
        };

        axiosOrange(config)
        .then(function (response) {
            const obj = Object.assign(response.data);
            res.status(201).json({
                message: 'code envoyé avec success ',
                status: 'OK',
                data: num,
                statusCode: 201
            })
        })
        .catch(function (error) {
            res.status(404).json({
                message: 'erreur envoie sms phone déjas utilisé ',
                status: 'OK',
                data: error,
                statusCode: 404
            })
        });
    }
    
    else {
        res.status(404).json({
            message: 'phone déjas utilisé ',
            status: 'OK',
            data: null,
            statusCode: 404
        })
    }

    
}

exports.verifCode = async (req, res , next ) => {

    const codes = await codePhoneModel.findOne({
        code : req.body.code,
        is_treat : false
    }) ;

    if(codes){
        codes.is_treat = true ;
        await codes.save();
        return res.status(200).json({
            message: 'code valid et verifier',
            status: 'OK',
            data: null,
            statusCode: 200
        })
    }

    return res.status(404).json({
        message: 'code non disponible ',
            status: 'OK',
            data: null,
            statusCode: 404
    })


} 