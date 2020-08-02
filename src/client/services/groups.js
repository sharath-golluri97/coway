import axios from 'axios';

export async function getUserGroups(params){
    try {
        const resp = await axios.get("/api/groups/getGroups", {params});
        console.log("api response", resp.data.groups);
        return resp.data.groups;
      } catch (err) {
        if (err.response) {
          throw err.response.data;
        } else if (err.request) {
          throw err.request;
        } else {
          throw err.message;
        }
      }
}

export async function getApprovedUserGroups(params){
  try {
    const resp = await axios.get("/api/groups/getApprovedGroups", {params});
    console.log("api response", resp.data.groups);
    return resp.data.groups;
  } catch (err) {
    if (err.response) {
      throw err.response.data;
    } else if (err.request) {
      throw err.request;
    } else {
      throw err.message;
    }
  }
}

export async function getGroupDetails(params){
    try {
        const resp = await axios.get("/api/groups/" + params.id, {});
        console.log("api response", resp.data.groups);
        return resp.data.groups;
      } catch (err) {
        if (err.response) {
          throw err.response.data;
        } else if (err.request) {
          throw err.request;
        } else {
          throw err.message;
        }
      }
}

export async function isUserInGroup(params){
    try {
        console.log("params" , params);
        const resp = await axios.get("/api/groups/status", {params});
        console.log("api response", resp.data.isExists);
        return resp.data.isExists;
      } catch (err) {
        if (err.response) {
          throw err.response.data;
        } else if (err.request) {
          throw err.request;
        } else {
          throw err.message;
        }
      }
}
