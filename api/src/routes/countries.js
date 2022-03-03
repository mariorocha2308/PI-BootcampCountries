const { Router } = require('express');
var request = require('request');
const { Country, Activity } = require('../db.js');
const router = require('express').Router();
const {Op} = require('sequelize')

//* En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//* Obtener un listado de los primeros 10 países

router.get('/countries', async (req, res) => {
    const {name} = req.query

    if (name) {
        
        //* Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
        //* Si no existe ningún país mostrar un mensaje adecuado
        
        let find = await Country.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`}},
            include: [Activity]
        })

        if (find) {
            return res.json(find)
        } else{
            return res.json({error: 'COUNTRY IS FAILED'})
        }

    } else {
        try {
            const limitCountries = await Country.findAll({include:[Activity]})
            return res.status(200).json(limitCountries)
        } catch (error) {
            console.log(error)
        }
    }
    
})

//* Obtener el detalle de un país en particular
//* Debe traer solo los datos pedidos en la ruta de detalle de país
//* Incluir los datos de las actividades turísticas correspondientes  
          
router.get('/countries/:idPais', async(req, res) => {
    let idPais = req.params.idPais
    idPais.toUpperCase()

    try{
        let country = await Country.findOne({
            where: {
                id: idPais
            },
            include:[Activity]
        })

        return res.status(200).json(country)

     } catch(err){
      res.status(404).json(err)
     }

})

router.get('/countries/extra/all', async (req, res) => {
    try {
        let extra = await Country.findAll({
            include:[Activity]
        })

        res.json(extra)
    } catch (error) {
        
    }
})

module.exports = router;