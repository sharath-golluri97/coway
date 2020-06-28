import axios from 'axios';

export async function reverseGeocode(lat,lon){
  try {
    const resp = await axios.get("https://nominatim.openstreetmap.org/reverse?format=json", {
      params: {
        lat: lat,
        lon: lon
      }
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
