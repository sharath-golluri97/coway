const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");

async function createJoinRequest(params){
    try {
        const url = appConfig.api.coway.joinRequest;
        const res = await fetch.post(url, params);
        return res;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
}

module.exports = {
    createJoinRequest
}