import axios from 'axios';

export async function getCities(){
    try {
        const resp = await axios.get("/api/cities/", {});
        console.log("api response", resp.data.cities);
        return resp.data.cities;
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