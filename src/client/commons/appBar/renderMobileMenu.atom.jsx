import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

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
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon/>
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon/>
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={props.handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle/>
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
};

export default renderMobileMenu;
