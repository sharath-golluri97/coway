import axios from 'axios';

export async function fetchPendingNotifications(params){
  try {
    const resp = await axios.get("/api/notifications/pending", {
      params
    });
    return resp.data;
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

export async function acceptPendingRequest(params){
  try {
    const resp = await axios.get("/api/notifications/accept", {
      params
    });
    return resp.data;
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

export async function rejectPendingRequest(params){
  try {
    const resp = await axios.get("/api/notifications/reject", {
      params
    });
    return resp.data;
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
