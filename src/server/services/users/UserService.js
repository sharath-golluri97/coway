const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");

async function isExistingUser(params){
    console.log("+++++isExistingUser++++++", params);
    try {
        const url = appConfig.api.coway.userDetails;
        const res = await fetch.get(url, {params});
        return res;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
}

async function createUser(user){
    console.log("+++++createUser++++++", user);
    try {
        const url = appConfig.api.coway.createUser;
        const res = await fetch.post(url,user);
        return res;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
}

module.exports = {
    isExistingUser,
    createUser
}