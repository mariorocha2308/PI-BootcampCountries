const { Router } = require('express');
const { Country ,Activity } = require('../db.js');
const router = Router();

router.post('/create', async (req, res) => {
    
    const { name, difficult, duration, season, codeCountry } = req.body

    try {
        var response = codeCountry.map(async (code) => await Country.findOne({where: {id: code}}))

        response = await Promise.all(response)

        Activity.create({            
            name,
            difficult,
            duration,
            season,    
        })
        .then((createdTourism) => {

            response.map((codeCountry) => {
                createdTourism.addCountry(codeCountry);
            })    

        })
        .then(tourism => {
            res.json(tourism); 
        }
    )} catch (error) {
        
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tourism = await Activity.findOne({
            where: {id}
        })

        if (tourism) {
            await tourism.destroy();
            res.status(200).send({ message: "Activity deleted successfully" });
        } else {
            res.status(400).send({ message: "Activity not exist" });
        }
    } catch (error) {
    }
})


module.exports = router;