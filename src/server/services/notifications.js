const axios = require("axios");
const { appConfig } = require("../utils/app-config");
const fetch = require("../utils/fetch");

async function getNotifications(params) {
  console.log("+++++appConfig++++++", appConfig.api);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.notifications;
    const res = await fetch.get(url,{params});
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}


async function acceptRequest(params) {
  console.log("+++++appConfig++++++", appConfig.api);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.acceptRequest;
    const res = await fetch.get(url,{params});
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

async function rejectRequest(params) {
  console.log("+++++appConfig++++++", appConfig.api);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.rejectRequest;
    const res = await fetch.delete(url,{params});
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}


module.exports = {
  getNotifications,
  acceptRequest,
  rejectRequest
}


