const { Router } = require('express');
var request = require('request');
const { Country, Activity } = require('../db.js');
const router = require('express').Router();

//* En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//* Obtener un listado de los primeros 10 países

router.get('/countries', async (req, res) => {
    const {name, offset} = req.query

    if (name) {
        
        //* Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
        //* Si no existe ningún país mostrar un mensaje adecuado

        request(`https://restcountries.eu/rest/v2/name/${name}`, {json: true}, function(error, response, data){

            if (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() === data[0].name) {
                return res.status(200).json(data)
            } else{
                return res.status(404).send('PAIS NO ENCONTRADO')
            }
            
        })   
        
    } else {

        request('https://restcountries.eu/rest/v2/all', { json: true }, function(error, response, data) {
            if (error) { res.status(404).send('CONSULTA FALLIDA'); }
          
            data.map(async(country) => {
                try {
                    await Country.findOrCreate({
                        where: {
                            id: country.alpha3Code,
                            name: country.name,
                            imageFlag: country.flag,
                            continent: country.region,
                            capital: country. capital,
                            subregion: country.subregion,
                            area: country.area,
                            population: country.population
                        }
                        
                    })   
                } catch (error) {
                    
                }
                
            })
                           
        });    
            
            try {
                const limitCountries = await Country.findAll({limit:10, offset: offset})
                return res.status(200).json(limitCountries)
            } catch (error) {
                
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
        const all = await Country.findAll()
        res.status(200).json(all)
    } catch (error) {
        res.status(404).send('CARGA FALLIDA')
    }
    
})
module.exports = router;