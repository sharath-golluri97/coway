import axios from 'axios';

export async function signInUser(params){
    try {
        var checkRequest = {};
        checkRequest["email"] = params.email;
        console.log("checkRequest", params);
        const resp = await axios.get("/api/users/userdetails", {params});
        console.log(resp.data);
        if(resp.data.user && resp.data.user.id){
            return resp.data.user.id;
        }
        else{
            console.log('creating new user..');
            const newUser = await axios.post("/api/users/create", {params});
            if(newUser.data.user && newUser.data.user.id){
                return newUser.data.user.id;
            }
            else {
                console.log('user creation failed.');
                return false;
            }
        }
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