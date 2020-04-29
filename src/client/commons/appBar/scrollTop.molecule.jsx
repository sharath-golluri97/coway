import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom/Zoom";
import PropTypes from "prop-types";
import React from "react";
import UseStyles from "./appBar.styles";
import ScrollHandleClick from "./scrollClick.eventhandler"

const ScrollTop = (props) => {
	const { children, window } = props;
	const classes = UseStyles();
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	return (
		<Zoom in={trigger}>
			<div onClick={ScrollHandleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 */
	window: PropTypes.func,
};


export default ScrollTop;
