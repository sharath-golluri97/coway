import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AuthProvider from "../../../Authenticator/authProvider";
import { ExitToApp } from "@material-ui/icons";

const handleLogOut = () => {
	return AuthProvider.logout();
};
const renderMobileMenu = (props) => {
	return (
		<Menu
			anchorEl={props.mobileMoreAnchorEl}
			anchorOrigin={{vertical: "top", horizontal: "right"}}
			id={props.mobileMenuId}
			keepMounted
			transformOrigin={{vertical: "top", horizontal: "right"}}
			open={props.mobileMenuOpen}
			onClose={props.handleMobileMenuClose}
		>
			<MenuItem onClick={handleLogOut}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="false"
					color="inherit"
				>
				<ExitToApp/>
				</IconButton>
				<p>Logout</p>
			</MenuItem>
		</Menu>
	);
};
export default renderMobileMenu;
