const { Router } = require('express');
const { Country ,Activity } = require('../db.js');
const router = Router();

//* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//* Crea una actividad turística en la base de datos

router.post('/activity', async (req, res) => {
    const { name, difficult, duration, season, codeCountry} = req.body

    try {
        var response = codeCountry.map(async(code) => await Country.findOne({where: {id: code}})
        )

        response = await Promise.all(response)

        Activity.create({            
            name,
            difficult,
            duration,
            season,    
        })
        .then(async (createdTourism) => {

            response.map((codeCountry) => {
                createdTourism.addCountry(codeCountry);
                
            })    

        }).then(
            tourism => {
                res.json(tourism); 
            }
        )

    } catch (error) {
        
    }
    
    
})


module.exports = router;