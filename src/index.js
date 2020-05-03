import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import b2cauth from "react-azure-adb2c";


b2cauth.initialize({
	instance: 'https://login.microsoftonline.com/tfp/',
	tenant: 'cowayauth.onmicrosoft.com',
	signInPolicy: 'B2C_1_coway_signup',
	applicationId: 'b722f51d-720a-4943-a4a3-a42c9c65005c',
	cacheLocation: 'sessionStorage',
	scopes: ['https://cowayauth.onmicrosoft.com/api/user_impersonation'],
	redirectUri: 'http://localhost:3000',
	postLogoutRedirectUri: window.location.origin,
});

b2cauth.run(() => {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>	,
		document.getElementById('root')
	);
	// serviceWorker.unregister();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

