const mongoose =require('mongoose') ;

const fournirSchema= new mongoose.Schema({
    produit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Produit',
        required: true
    }],

    prixGros: {
        type: Number,
        required: true
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

})

const Fournir= new mongoose.model('Fournir', fournirSchema);


module.exports=Fournir;