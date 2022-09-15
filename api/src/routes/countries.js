const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const router = require('express').Router();
const {Op} = require('sequelize')

router.get('/all', async (req, res) => {
    const {name} = req.query

    if (name) {
        
        let find = await Country.findAll({
            where: {name: {[Op.iLike]: `%${name}%`}},
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

router.get('/sortbar', async (req, res) => {

    const { continent, order, filter } = req.query
    const [key, value] = order?.split(' ') ?? []

    try {
        let sortCountries = await Country.findAll({
            where: continent ? { continent: continent } : null,
            order: order ? [[key, value]] : null,
            include: {
                model: Activity,
                where: filter ? {name: filter} : null,
            }
        })

        return res.status(200).json(sortCountries)

    } catch (error) {  
        res.status(404).json(error)
    }
})

router.get('/:idPais', async (req, res) => {
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

module.exports = router;