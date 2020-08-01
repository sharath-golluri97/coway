const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");

async function fetchAllEvents(params) {
  console.log("+++++appConfig++++++", params);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.events;
    const res = await fetch.get(url,params);
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

async function createEvent(params) {
  console.log("+++++appConfig++++++", params);
  try {
    const url = appConfig.api.coway.events;
    const res = await fetch.post(url, params);
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

module.exports = {
  fetchAllEvents,
  createEvent
}
