import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const renderMenu = (props) => {
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
			<MenuItem onClick={props.handleMenuClose}>Logout</MenuItem>
		</Menu>
	);
};

export default renderMenu;
