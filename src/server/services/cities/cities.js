const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");

async function getCities(){
    try {
        const url = appConfig.api.coway.getCities;
        const res = await fetch.get(url, {});
        return res;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
}

module.exports = {
    getCities
}