import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
	root: {
	  position: "fixed",
	  bottom: theme.spacing(2),
	  right: theme.spacing(2)
	},
	grow: {
	  flexGrow: 1
	},
	menuButton: {
	  marginRight: theme.spacing(2)
	},
	title: {
	  display: "none",
	  [theme.breakpoints.up("sm")]: {
		display: "block"
	  }
	},
	inputRoot: {
	  color: "inherit"
	},
	inputInput: {
	  padding: theme.spacing(1, 1, 1, 0),
	  // vertical padding + font size from searchIcon
	  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
	  transition: theme.transitions.create("width"),
	  width: "100%",
	  [theme.breakpoints.up("md")]: {
		width: "20ch"
	  }
	},
	sectionDesktop: {
	  display: "none",
	  [theme.breakpoints.up("md")]: {
		display: "flex"
	  }
	},
	sectionMobile: {
	  display: "flex",
	  [theme.breakpoints.up("md")]: {
		display: "none"
	  }
	}
  }));

export default useStyles;
