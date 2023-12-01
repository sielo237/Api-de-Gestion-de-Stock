const mongoose =require('mongoose') ;

const fournisseurSchema= new mongoose.Schema({
    nom: {
        type: String,
        unique:true,
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

const Fournisseur= new mongoose.model('Fournisseur', fournisseurSchema);


module.exports=Fournisseur;