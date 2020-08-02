const axios = require("axios");
const { appConfig } = require("../../utils/app-config");
const fetch = require("../../utils/fetch");


async function fetchGroupsForUser(params) {
    console.log("+++++appConfig++++++", params);
    try {
      // logger.info(`Entered ${req.originalUrl} route`);
      const url = appConfig.api.coway.groupsForUser;
      const res = await fetch.get(url,{params});
      return res;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

async function fetchApprovedGroupsForUser(params) {
  console.log("+++++appConfig++++++", params);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.approvedGroupsForUser;
    const res = await fetch.get(url,{params});
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

async function fetchGroupDetails(params) {
  console.log("+++++fetchGroupDetails++++++", params);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.groupDetails;
    const res = await fetch.get(url + params.id, {});
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

async function isUserInGroup(params) {
  console.log("+++++isUserInGroup++++++", params);
  try {
    // logger.info(`Entered ${req.originalUrl} route`);
    const url = appConfig.api.coway.userExistsInGroup;
    const res = await fetch.get(url, {params});
    return res;

  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

module.exports = {
  fetchGroupsForUser,
  fetchGroupDetails,
  isUserInGroup,
  fetchApprovedGroupsForUser
}
