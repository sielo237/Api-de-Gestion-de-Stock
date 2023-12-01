const express =require('express') ;
const Fournisseur =require('../models/fournissseurM') ;

const router = express.Router();

// Ajouter un fournisseur
router.post('/fournisseurs/add', async (req, res) => {
  try {
    const { nom, adresse, telephone } = req.body;
    const fournisseur = new Fournisseur({ nom, adresse, telephone });
    const nouveauFournisseur = await fournisseur.save();
    res.status(201).json(nouveauFournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un fournisseur
router.put('/fournisseurs/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, telephone } = req.body;

    const fournisseur = await Fournisseur.findByIdAndUpdate(id, { nom, adresse, telephone }, { new: true });

    if (!fournisseur) {
      return res.status(404).send({ message: 'Fournisseur non trouvé' });
    }

    res.send(fournisseur);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Supprimer un fournisseur
router.delete('/fournisseurs/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fournisseur = await Fournisseur.findByIdAndRemove(id);

    if (!fournisseur) {
      return res.status(404).send({ message: 'Fournisseur non trouvé' });
    }

    res.json({ message: 'Fournisseur supprimé avec succès' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Afficher tous les fournisseurs
router.get('/fournisseurs', async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.send(fournisseurs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
