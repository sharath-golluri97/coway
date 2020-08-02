import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // width: 500,
    boxShadow: '0 0 1.5px black'
  },
});

function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue: " + newValue);
    // switch (newValue) {
    //   case "notifications" :
    //     setTimeout(function() {
    //       props.history.push('/notifications')
    //     }, 1000);
    //
    // }
  };

  return (
    <BottomNavigation value={value}
     onChange={handleChange}
     className={classes.root}
     showLabels
     >
      <BottomNavigationAction label="Recents" value="recents" 
        icon={ 
                <Link to={'/'} style={{ textDecoration: 'none' }} >
                <RestoreIcon /> 
                </Link>
              } 
      />
      <BottomNavigationAction
        label="Create"
        value="create-event"
        icon={
          <Link to={'/create'} style={{ textDecoration: 'none' }} >
          <AddCircleIcon/>
          </Link>
          }
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={
          <Link to={'/mapView'} style={{ textDecoration: 'none' }} >
          <LocationOnIcon/>
          </Link>
          }
      />
      <BottomNavigationAction
        label="Notifications"
        value="notifications"
        icon={
          <Link to={'/notifications'} style={{ textDecoration: 'none' }} >
            <Badge badgeContent={2} color="primary">
              <NotificationsIcon />
            </Badge>
          </Link>
        }
      />
    </BottomNavigation>
  );
}

export default LabelBottomNavigation;
