import { MsalAuthProvider, LoginType } from "react-aad-msal";

const tenant = "ridemateauth.onmicrosoft.com";
const signInPolicy = "B2C_1_RideMate_Auto";
const applicationID = "5396f86f-45cf-4b03-b7b0-673bcdcf5bbf";
const reactRedirectUri = window.location.origin;
const tenantSubdomain = tenant.split(".")[0];
const instance = `https://${tenantSubdomain}.b2clogin.com/tfp/`;
const signInAuthority = `${instance}${tenant}/${signInPolicy}`;
// Msal Configurations

const signInConfig = {
	auth: {
		authority: signInAuthority,
		clientId: applicationID,
		redirectUri: reactRedirectUri,
		validateAuthority: false
	},
	cache: {
		cacheLocation: "sessionStorage",
		storeAuthStateInCookie: true
	}
};
// Authentication Parameters
const authenticationParameters = {
	scopes: [
		"https://graph.microsoft.com/Directory.Read.All",
		" https://ridemateauth.onmicrosoft.com/api/user_impersonation"
	]
};
// Options
const options = {
	loginType: LoginType.Redirect,
	tokenRefreshUri: window.location.origin + "/auth.html"
};

const AuthProvider = new MsalAuthProvider(
	signInConfig,
	authenticationParameters,
	options
);

export default AuthProvider;
