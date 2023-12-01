const express =require('express') ;
const app= express();
const cors =require('cors') ;
const connection =require('./db') ;
const clientRoutes =require('./routes/client') ;
const commandeRoutes =require('./routes/commande') ;
const fournisseurRoutes =require('./routes/fournisseur') ;
const produitRoutes =require('./routes/produit') ;

require('dotenv').config();

connection();
app.use(express.json());
app.use(cors());


// utilisation des routes

app.use(clientRoutes);
app.use(commandeRoutes);
app.use(fournisseurRoutes);
app.use(produitRoutes);


const PORT= process.env.PORT || 3000;

app.listen(PORT,()=> console.log("serveur démarrer sur le port "+PORT) );




