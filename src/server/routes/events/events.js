const express = require('express');
const { fetchAllEvents, createEvent} = require('../../services/events/EventService');
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

router.post("/create", async function (req, res, next) {
  try{
    logger.info(`Entered ${req.originalURL} route`);
    const params = req.body;
    const data = await createEvent(params.event);
    res.send(data.data);
  } catch(error) {
    console.log("error in create Events", error);
    next(error);
  }
});
  
module.exports = router;

