import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Badge from "@material-ui/core/Badge";
import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useStyles from "./appBar.styles";
import RenderMenu from "./renderMenu.atom";
import RenderMobileMenu from "./renderMobileMenu.atom";
import ScrollTop from "./scrollTop.molecule";

//Can't use function nmae as AppBar as it an identifier in material-UI components. Hence, BackToTop.
const PrimaryAppBar = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const mobileMenuId = "primary-search-account-menu-mobile";

	return (
		<div className={classes.grow}>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Coway
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{/*{renderMobileMenu}*/}
			<RenderMobileMenu
				mobileMenuId={mobileMenuId}
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				mobileMenuOpen={isMobileMenuOpen}
				handleMobileMenuClose={handleMobileMenuClose}
				handleProfileMenuOpen={handleProfileMenuOpen}
			/>
			{/*{renderMenu}*/}
			<RenderMenu
				menuId={menuId}
				anchorEl={anchorEl}
				menuOpen={isMenuOpen}
				handleMenuClose={handleMenuClose}
			/>
			<Toolbar id="back-to-top-anchor" />
			<Container>
				<Box my={2}>
					{[...new Array(12)]
						.map(
							() => `With Coway, we aim to build a provider that lets users connect with others based on their travel itinerary. This is unlike any other ride-sharing or car-pooling service, as we connect people irrespective of whether they have any vehicle. If anyone is planning to travel and wants to connect to the fellow travelers virtually, we help them connect by creating chat rooms for them. A further extension to this will also allow creating specific events, serving as a self-served ticketing platform for event organizers. The participants can register, connect with other participants, get updated details directly from event organizers, and plan their travel all on a single platform. The solo travelers can find the others, you can also interact with others on the same bus or flight with you with our secure platform. The extent of details that can be shared can be controlled by the users, of course, thus honoring the privacy and security of every user.`,
						)
						.join('\n')}
				</Box>
			</Container>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</div>
	);
}

export default PrimaryAppBar;
