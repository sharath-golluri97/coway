const express = require('express');
const router = express.Router();
const {logger} = require("../../utils/logger");
const { fetchGroupsForUser,fetchGroupDetails,isUserInGroup,fetchApprovedGroupsForUser, fetchGroupParticipants } = require('../../services/groups/GroupService');


router.get("/getGroups", async function (req, res, next) {
    try{
      logger.info(`Entered ${req.originalURL} route`);
      const params = req.query;
      const data = await fetchGroupsForUser(params);
      res.send(data.data);
    } catch(error) {
      console.log("error in fetching groups", error);
      next(error);
    }
  });

router.get("/getApprovedGroups", async function (req, res, next) {
  try{
    logger.info(`Entered ${req.originalURL} route`);
    const params = req.query;
    const data = await fetchApprovedGroupsForUser(params);
    res.send(data.data);
  } catch(error) {
    console.log("error in fetching groups", error);
    next(error);
  }
});


router.get("/status", async function (req, res, next) {
    try{
        logger.info(`Entered ${req.originalURL} route`);
        const {id, email} = req.query;
        var request = {};
        request['id']=id;
        request['email']= email;
        logger.info("params", request);
        const data = await isUserInGroup(request);
        res.send(data.data);
    } catch(error) {
        console.log("error in isUserInGroup", error);
        next(error);
    }
});

router.get("/details/:id", async function (req, res, next) {
  try{
      const params = req.params;
      logger.info("params", params);
      const data = await fetchGroupParticipants(params);
      res.send(data.data);
  } catch(error) {
      console.log("error in fetching group participants", error);
      next(error);
  }
});

router.get("/:id", async function (req, res, next) {
    try{
        logger.info(`Entered ${req.originalURL} route`);
        const params = req.params;
        logger.info("params", params);
        const data = await fetchGroupDetails(params);
        res.send(data.data);
    } catch(error) {
        console.log("error in fetching group details", error);
        next(error);
    }
});




module.exports = router;
