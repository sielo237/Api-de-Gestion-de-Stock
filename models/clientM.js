const mongoose =require('mongoose') ;

const clientSchema= new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },

    prenom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },

    telephone:{
        type: Number,
        required: true
    }

})

const Client= new mongoose.model('Admin', clientSchema);


module.exports=Client;