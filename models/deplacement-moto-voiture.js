const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deplacementModel = new Schema({

   

    isTreat : {
        type: String,
        enum: ['pending', 'completed','cancelClient','cancelDriver','cancelDeally','cancelTime'],
        default: 'pending'
    },

    status:{
        type: String,
        enum: ['pending driver', 'driver accept','canceled','completed'],
        default: 'pending driver'
    },

    someoneElse :{
        type: Schema.Types.ObjectId,
        ref :'someone-else'
    },

    justicatif  : {
        type : String ,
        default : ''
    },

    moyenDePaiement  :{
        type: String,
        enum: ['orange money', 'mtn momo','cash on delivery' , 'wallet'],
        default: 'orange money'
    },


    price : {
        type : String ,
        default : '5500'
    },

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    driver_cancel : [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    
    driver :{
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    typeDeplacement : {
        type: String,
        enum: ['voiture', 'moto'],
        default: 'moto'
    },

    duree :  {
        type : String ,
        default : ''
    },

    distance :  {
        type : String ,
        default : ''
    },



    pointDepart : {
        type: Schema.Types.ObjectId,
        ref :'point'
    },

    pointArrive : {
        type: Schema.Types.ObjectId,
        ref :'point'
    },

    date : {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('deplacement', deplacementModel);