import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AuthProvider from "../../../Authenticator/authProvider";

const renderMenu = (props) => {
	const handleLogOut = () => {
		return AuthProvider.logout();
	};
	return (
		<Menu
			anchorEl={props.anchorEl}
			anchorOrigin={{vertical: "top", horizontal: "right"}}
			id={props.menuId}
			keepMounted
			transformOrigin={{vertical: "top", horizontal: "right"}}
			open={props.menuOpen}
			onClose={props.handleMenuClose}
		>
			<MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleLogOut}>Log out</MenuItem>
		</Menu>
	);
};

export default renderMenu;
