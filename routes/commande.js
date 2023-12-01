const express =require('express') ;
const Commande =require('../models/commandeM');
const Produit = require('../models/produitsM');
const { sendEmail } =require('../services/email') ;
const router = express.Router();


// Ajouter une commande
router.post('/commandes/add', async (req, res) => {
  try {
    const { client, produits } = req.body;
    let prixTotal = 0;

    const produitsACommander = await Promise.all(
      produits.map(async (produit) => {
        const { produitId, quantite } = produit;

        const produitExist = await Produit.findById(produitId);

        if (!produitExist) {
          throw new Error(`Le produit avec l'ID ${produitId} n'existe pas`);
        }

        if (produitExist.qteStock < quantite) {
          throw new Error(`Quantité de stock insuffisante pour le produit " ${produitExist.nom} "`);
        }

        // MAJ de la quantité de produit
        produitExist.qteStock -= quantite;
        await produitExist.save();

        prixTotal += produitExist.prix * quantite;

        // Vérifier la quantité de stock
        if (produitExist.qteStock < 5) {
          const adminEmail = process.env.MAIL; 
          const subject = 'Alerte stock bientôt épuisé';
          const message = `Le produit ${produitExist.nom} a une quantité de stock inférieure à 5, veuillez vous ravitailler.`;

          await sendEmail(adminEmail, subject, message);
        }

        return {
          produit: produitId,
          quantite
        };
      })
    );

    const commande = new Commande({ client, produits: produitsACommander, prixTotal });
    const nouvelleCommande = await commande.save();

    res.status(201).json(nouvelleCommande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// MAJ une commande
router.put('/commandes/update:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { client, produit, prixTotal } = req.body;

    const commande = await Commande.findByIdAndUpdate(id, { client, produit, prixTotal }, { new: true });

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une commande
router.delete('/commandes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const commande = await Commande.findByIdAndRemove(id);

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
});

// Lister toutes les commandes
router.get('/commandes', async (req, res) => {
  try {
    const commandes = await Commande.find();
    
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
});

module.exports = router;
