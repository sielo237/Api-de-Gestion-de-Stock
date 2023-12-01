const express =require('express') ;
const Client =require('../models/clientM');

const router = express.Router();

// Ajouter un client
router.post('/clients/add', async (req, res) => {
  try {
    const { nom, prenom, adresse, telephone } = req.body;
    const client = new Client({ nom, prenom, adresse, telephone });
    const nouveauClient = await client.save();
    res.status(201).json(nouveauClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un client
router.put('/clients/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, adresse, telephone } = req.body;

    const client = await Client.findByIdAndUpdate(id, { nom, prenom, adresse, telephone }, { new: true });

    if (!client) {
      return res.status(404).json({ message: 'Ce client n\'existe pas' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un client
router.delete('/clients/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndRemove(id);

    if (!client) {
      return res.status(404).json({ message: 'Ce client n\'existe pas' });
    }

    res.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lister tous les clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
