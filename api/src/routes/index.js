const { Router } = require('express');
const countries = require('./countries.js');
const activity = require('./activity.js');

const router = Router();

router.use('/country', countries)
router.use('/activity', activity)

module.exports = router;
