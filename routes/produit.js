const express =require('express') ;
const Produit =require('../models/produitsM') ;

const router = express.Router();

// Ajouter un produit
router.post('/produits/add', async (req, res) => {
  try {
    const { nom, qteStock, prix, prixGros, fournisseur } = req.body;
    const produit = new Produit({ nom, qteStock, prix, prixGros, fournisseur });
    const nouveauProduit = await produit.save();
    res.status(201).json(nouveauProduit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un produit
router.put('/produits/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, qteStock, prix, prixGros, fournisseur } = req.body;

    const produit = await Produit.findByIdAndUpdate(id, { nom, qteStock, prix, prixGros, fournisseur }, { new: true });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un produit
router.delete('/produits/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const produit = await Produit.findByIdAndRemove(id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lister tous les produits
router.get('/produits', async (req, res) => {
  try {
    const produits = await Produit.find().populate('fournisseur');
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
