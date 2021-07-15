const { Router } = require('express');
const { Activity } = require('../db.js');
const router = Router();

//* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//* Crea una actividad turística en la base de datos

router.post('/activity', async (req, res) => {
    const { name, difficult, duration, season, idPais} = req.body
  
    
        Activity.create({            
            name,
            difficult,
            duration,
            season,    
        })
        .then(async (createdTourism) => {
            
            await createdTourism.addCountry(idPais);
            res.json(createdTourism); 

        }).catch((error) => res.send(error)); 
})


module.exports = router;