const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const router = require('express').Router();
const {Op} = require('sequelize')

router.get('/countries', async (req, res) => {
    const {name} = req.query

    if (name) {
        
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
          
router.get('/countries/:idPais', async (req, res) => {
    let { idPais } = req.params
    idPais.toUpperCase()

    try{
        let country = await Country.findOne({
            where: {id: idPais},
            include:[Activity]
        })

        return res.status(200).json(country)

     } catch(err){
      res.status(404).json(err)
     }

})

router.get('/countries/', async (req, res) => {
    try {
        const sortCountries = await Country.findAll({
            where: {
                [Op.or]: [
                    { continent: 12 }
                ]
            }
        })
    } catch (error) {
        
    }
})

module.exports = router;