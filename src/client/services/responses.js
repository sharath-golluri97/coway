import axios from 'axios';

export async function createJoinRequest(params){
    try {
        const resp = await axios.post("/api/responses/joinRequest", params);
        console.log("api response", resp.data.status);
        return resp.data.status;
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