const express = require('express');
const { fetchAllEvents } = require('../../services/events/EventService');
const router = express.Router();
const {logger} = require("../../utils/logger");

router.get("/fetchAll", async function (req, res, next) {
  try{
    logger.info(`Entered ${req.originalURL} route`);
    const params = req.query;
    const data = await fetchAllEvents(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in getEventsForAlgolia", error);
    next(error);
  }
});



  
module.exports = router;

