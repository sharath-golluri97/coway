import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: "100%",
    maxWidth: "36ch",
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(MenuItem);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    PaperProps={{
      style: {
        maxHieght: "40vh",
        overflowY: "scroll",
      },
    }}
    {...props}
  />
));

const PendingRequestList = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(JSON.stringify(props.notificationList));
  }, []);

  return (
    <div>
      <IconButton aria-label="requests" onClick={handleClick}>
        <Badge badgeContent={props.notificationList.length} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.root}
      >
        {props.notificationList.map((notification,i) => {
          return (
            <Link key={i} to={`/notifications/${notification.group.id}/${notification.user_id}`} style={{ textDecoration: 'none' }}>

            <div key={i}>
              <StyledMenuItem key={i}>
              <ListItemAvatar>
                <Avatar alt={notification.user.full_name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={notification.user.full_name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {notification.group.group_name}
                    </Typography>
                  </React.Fragment>
                }
              />
            </StyledMenuItem>
            <Divider variant="inset" component="li" />
          </div>
            </Link>
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default PendingRequestList;
