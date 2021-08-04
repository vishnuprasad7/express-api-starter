const express = require('express');
const axios = require('axios')
const router = express.Router();

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';

let cachedData;
let cacheTime;

router.get('/', async (req, res, next) => {
    // console.log(cities)
    if (cacheTime && cacheTime > Date.now() - 30 * 1000) { //in-memory cache for 30 seconds
        return res.json(cachedData)
    }
    try {

        const params = new URLSearchParams({
            appid: process.env.API_KEY,
            q:"Bengaluru"
        })
        const { data } = await axios.get(`${BASE_URL}${params}`)
        cachedData = data;
        cacheTime = Date.now()
        data.cacheTime = cacheTime;
        return res.json(data)

    }
    catch (error) {
        return next(error);
    }
    //1.make a request to open weather api
    //2. respond to this request 
    res.json({
        message: 'Hello Openweather'
    })
});

module.exports = router;
