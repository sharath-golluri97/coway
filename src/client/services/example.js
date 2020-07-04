/**
import axios from 'axios';

export async function fetchEventForAlgolia(params){
  try {
    const resp = await axios.get("/api/map/algolia", {
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

 **/


//To use this function in any react component

/**

 import {fetchEventForAlgolia} from "../../services/example";

 const ReactComponentExample = (props)=>{

  fetchEventForAlgolia().then(resp => {
    console.log(JSON.stringify(resp));
  })

  return(
    <div>
      Welcome
    </div>
  )
}

 **/
