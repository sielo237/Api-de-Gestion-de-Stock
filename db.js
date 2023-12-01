const mongoose= require('mongoose');


//mongoose.set('StrictQuery', false);


module.exports=(async()=>{
    const  connectionsParams={
        useNeUrlParserser: true,
        useUnifiedTopology: true,
    };

    try{

        await mongoose.connect(process.env.DB);
        console.log("Base de Données connectée");
    } catch(error){
        console.log("erreur lors de la connection a la base de donnée: "+error);
        }
      
})