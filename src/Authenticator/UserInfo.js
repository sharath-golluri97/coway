import Auth from "./Auth";
import React from "react";

const displayUserInformation = () => {
	const auth = new Auth();
	if (auth.isLoggedIn()) {
		console.log(auth.currentUser());
		return (
			<div>
				<p>
					Welcome, {auth.currentUser().firstName} {auth.currentUser().lastName} from {auth.currentUser().city}, {auth.currentUser().country}
				</p>
				<a
					className="App-link"
					href="/abc" onClick={() => auth.logout()}
				>
					Sign Out
				</a>
			</div>
		);

	}
}

export default displayUserInformation;
