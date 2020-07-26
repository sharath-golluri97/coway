

const express = require("express");
const {logger} = require("../utils/logger");

const {getEventsForAlgolia} = require("../services/example");


const router = express.Router();


//  Example

router.get("/algolia", async function (req, res, next) {
  try{
    const params = req.body;
    console.log("params->", params);
    logger.info(`Entered ${req.originalURL} route`);
    const data = await getEventsForAlgolia(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in getEventsForAlgolia", error);
    next(error);
  }
});

module.exports = router;

