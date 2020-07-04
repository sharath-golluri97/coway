/**

const axios = require("axios");
const { appConfig } = require("../utils/app-config");
const fetch = require("../utils/fetch");

async function getEventsForAlgolia(params) {
  console.log("+++++appConfig++++++", appConfig.api);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.algolia;
    const res = await fetch.get(url);
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}


module.exports = {
  getEventsForAlgolia
}

**/
