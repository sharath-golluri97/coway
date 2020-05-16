import sha256 from 'crypto-js/sha256';
import AuthProvider from "./authProvider";
import AES from 'crypto-js/aes';
import decodeJWT from "jwt-decode";

export const idToken = () => {
	return AuthProvider.getIdToken().then((response) => {
		// return response || false;
		return response.idToken.rawIdToken;
		});
};

export const getUserInfo = () => {
	return idToken().then(id_token => {
		const decoded = decodeJWT(id_token);
		const userInfo = {
			firstName: decoded.given_name,
			lastName: decoded.family_name,
			city: decoded.city,
			country: decoded.country,
			email : decoded.emails[0]
		};
		return userInfo;
	})


}
