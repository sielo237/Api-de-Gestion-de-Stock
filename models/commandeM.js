const mongoose =require('mongoose') ;

const commandeSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true
  },
  produits: [{
    produit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'produits',
      required: true
    },
    quantite: {
      type: Number,
      required: true
    }
  }],
  prixTotal: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Commande = new mongoose.model('Commande', commandeSchema);

module.exports = Commande;
