const express = require("express");
const {logger} = require("../utils/logger");

const {getNotifications, acceptRequest, rejectRequest} = require("../services/notifications");
const router = express.Router();

router.get("/pending", async function (req, res, next) {
  try{
    const params = req.query;
    console.log("params->", params);
    logger.info(`Entered ${req.originalURL} route`);
    const data = await getNotifications(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in getNotifications", error);
    next(error);
  }
});

router.get("/accept", async function (req, res, next) {
  try{
    const params = req.query;
    console.log("params->", params);
    logger.info(`Entered ${req.originalURL} route`);
    const data = await acceptRequest(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in acceptRequest", error);
    next(error);
  }
});

router.get("/reject", async function (req, res, next) {
  try{
    const params = req.query;
    console.log("params->", params);
    logger.info(`Entered ${req.originalURL} route`);
    const data = await rejectRequest(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in rejectRequest", error);
    next(error);
  }
});


module.exports = router;

