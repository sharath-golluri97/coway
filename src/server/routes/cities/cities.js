const express = require('express');
const router = express.Router();
const {logger} = require("../../utils/logger");
const { getCities } = require('../../services/cities/cities');
const {cacheMiddleware} = require("../../utils/cache");

router.get("/", cacheMiddleware(600000), async function (req, res, next) {
    try{
        const data = await getCities();
        res.send(data.data);
    } catch(error) {
        console.log("error in user details", error);
        next(error);
    }
});


module.exports = router;