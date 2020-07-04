import React from "react";
import decodeJWT from 'jwt-decode';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import AuthProvider from "./authProvider";


const displayUserInformation = () => {
	return (
		<AzureAD provider={AuthProvider} forceLogin={true}>
			{
				({login, authenticationState, error, accountInfo}) => {
					const decoded = decodeJWT(accountInfo.jwtIdToken);
					const userInfo = {
						firstName: decoded.given_name,
						lastName: decoded.family_name,
						city: decoded.city,
						country: decoded.country,
					};
					switch (authenticationState) {
						case AuthenticationState.Authenticated:
							return (
								<p>
									<span>Welcome, {userInfo.firstName + " " + userInfo.lastName + " from " + userInfo.city + ", " + userInfo.country}!</span>
								</p>
							);
						case AuthenticationState.Unauthenticated:
							return (
								<div>
									{error && <p><span> Error, please try again!</span></p>}
									<p>
										<span>Hey stranger, you look new!</span>
										<button onClick={login}>Login</button>
									</p>
								</div>
							);
						case AuthenticationState.InProgress:
							return (<p>Authenticating...</p>);
						default:
							return false;
					}
				}
			}
		</AzureAD>
	);
}

export default displayUserInformation;
