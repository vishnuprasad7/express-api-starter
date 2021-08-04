const express = require('express');

const weatherApi = require('./openweather')

const router = express.Router();


router.use('/openWeather',weatherApi)

module.exports = router;
