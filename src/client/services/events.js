import axios from 'axios';

export async function createEvent(event){
    try {
        const resp = await axios.post("/api/events/create", {event});
        console.log("api response", resp.data.event);
        return resp.data.event;
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