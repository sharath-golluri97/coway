const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");

async function fetchAllEvents(params) {
    console.log("+++++appConfig++++++", appConfig.api, params);
    try {
      // logger.info(`Entered ${req.originalUrl} route`);
      const url = appConfig.api.coway.algolia;
      const res = await fetch.get(url,params);
      return res;
  
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }


  
  module.exports = {
    fetchAllEvents
  }