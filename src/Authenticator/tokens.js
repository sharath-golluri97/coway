import AuthProvider from "./authProvider";
import decodeJWT from "jwt-decode";
import {signInUser} from "../client/services/users";

export const idToken = () => {
	return AuthProvider.getIdToken().then((response) => {
		// return response || false;
		return response.idToken.rawIdToken;
		});
};

export const getUserInfo = () => {
	return idToken().then(id_token => {
		const decoded = decodeJWT(id_token);
		var userInfo = {
			firstName: decoded.given_name,
			lastName: decoded.family_name,
			city: decoded.city,
			country: decoded.country,
			email : decoded.emails[0]
		};
		// check if exists
		return signInUser(userInfo).then(userDetails =>{
			if(userDetails !== false){
				userInfo['userId']= userDetails.id;
				userInfo['username']=userDetails.username;
				console.log("userInfo", userInfo);
				return userInfo;
			}
			else{
				console.log('user auth failed..');
				return null;
			}
		});
		
		// create if doesn't exist
	})
}
