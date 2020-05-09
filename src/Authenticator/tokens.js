import sha256 from 'crypto-js/sha256';
import AuthProvider from "./authProvider";

const  idToken = () => {
	  AuthProvider.getIdToken().then((response) => {
	 	let encryptedIdToken = sha256(response.idToken.rawIdToken);
	 	localStorage.setItem('ID_TOKEN', encryptedIdToken);
	 	return response || false;
	 });
};

export default idToken;
