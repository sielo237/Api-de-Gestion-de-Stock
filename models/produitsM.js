const mongoose =require("mongoose") ;


const produitSchema= mongoose.Schema({

    nom:{
        type: String,
        reqpuired:true

    },

    qteStock:{
        type: Number,
        reqpuired:true,
        default: 0

    },

    prix:{
        type: Number,
        reqpuired:true

    },

    prixGros:{
        type: Number,
        reqpuired:true

    },

    fournisseur:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Fournisseur',
        required: true
    },


    date:{
        type: Date,
        default: Date.now()
    }


    

});

const  Produit= new mongoose.model('Produit', produitSchema);


module.exports=Produit;