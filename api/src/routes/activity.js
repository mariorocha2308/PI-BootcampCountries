const { Router } = require('express');
const { Country ,Activity } = require('../db.js');
const router = Router();

router.post('/create', async (req, res) => {
    
    const { name, difficult, duration, season, codeCountry } = req.body

    try {
        
        if ([name, difficult, duration, season, codeCountry].includes('')) {
            res.status(404).send({ error: "Invalid post"});
            return; 
        }

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
        .then(() => {
            res.status(200).send({ message: "Activity created successfully"}); 
        }
    )} catch (error) {
        res.status(404).send({ error: "Activity not created"})
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
            res.status(200).send({ message: "Activity deleted successfully"});
        } else {
            res.status(400).send({ error: "Activity not exist" });
        }
    } catch (error) {
        res.status(404).json(error)
    }
})


module.exports = router;