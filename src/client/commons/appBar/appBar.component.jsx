import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from "@material-ui/icons/Menu";
import {AccountCircle} from '@material-ui/icons';
import  {
	AppBar,
	Avatar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
    ListItemText,
    ListItemIcon,
	Toolbar,
    Typography,
} from '@material-ui/core';
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./appBar.styles";
import RenderMenu from "./renderMenu.atom";
import RenderMobileMenu from "./renderMobileMenu.atom";
import MobilRightMenuSlider from '@material-ui/core/Drawer';
import avatar from '../images/avatar.png';
import MenuItems from './constants.atom';
import {Link} from "react-router-dom";


//Can't use function name as AppBar as it an identifier in material-UI components. Hence, BackToTop.
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

	const [state, setState] = useState({
        right: false
    })
    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open });
    };
    const sideList = slider => (
        <Box
        className={classes.menuSliderContainer}
        component="div"
        onClick={toggleSlider(slider, false)}
        >
            <Avatar className={classes.avatar} src={avatar} alt="Coway Inc." />
            <Divider />
            <List>
                {MenuItems.map((lsItem,key)=>(
                  lsItem.listText === "Feedback" ?
                <a key={key} href={lsItem.url} target="_blank" className={classes.a}>
                <ListItem button key={key}>
                    <ListItemIcon className={classes.listItem}>
                        {lsItem.listIcon}
                    </ListItemIcon>
                    <ListItemText
                    className={classes.listItem}
                    primary={lsItem.listText}
                    />
                </ListItem>
                </a>
                    :
                    <Link to={lsItem.url} style={{ textDecoration: 'none' }} className={classes.a}>
                      <ListItem button key={key}>
                        <ListItemIcon className={classes.listItem}>
                          {lsItem.listIcon}
                        </ListItemIcon>
                        <ListItemText
                          className={classes.listItem}
                          primary={lsItem.listText}
                        />
                      </ListItem>
                    </Link>
                ))}
            </List>
        </Box>

    )
	return (
		<div className={classes.grow}>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<IconButton edge="start"
					onClick={toggleSlider("right", true)}
					color="inherit"
					aria-label="open drawer">
                    <MenuIcon />
                    </IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Ridemate
					</Typography>
					<MobilRightMenuSlider
                     anchor="left"
                    open={state.right}
                    onClose={toggleSlider("right", false)}
                    >
                        {sideList("right")}
                    </MobilRightMenuSlider>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
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
			<RenderMobileMenu
				mobileMenuId={mobileMenuId}
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				mobileMenuOpen={isMobileMenuOpen}
				handleMobileMenuClose={handleMobileMenuClose}
				handleProfileMenuOpen={handleProfileMenuOpen}
			/>
			<RenderMenu
				menuId={menuId}
				anchorEl={anchorEl}
				menuOpen={isMenuOpen}
				handleMenuClose={handleMenuClose}
			/>
			<Toolbar id="back-to-top-anchor" />
		</div>
	);
}
export default PrimaryAppBar;
