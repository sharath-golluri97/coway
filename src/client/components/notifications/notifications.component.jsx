import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     // maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));
//
// export default function Notifications() {
//   const classes = useStyles();
//
//   return (
//     <List className={classes.root}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//   );
// }


import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PendingRequestData from "../events/selection/mocks/getUserGroupInfoForPendingRequest";
import axios from "axios";
import _ from "lodash";
import {getUserInfo} from "../../../Authenticator/tokens";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
const signalR = require("@aspnet/signalr");


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Notifications() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [userInfo, setUserInfo] = useState({});
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);

  const apiBaseUrl = "http://localhost:7071";

  function sendMessage(sender, messageText, groupId, groupName, creatorUser) {
    return axios
      .post(`${apiBaseUrl}/api/notification`, {
        sender: sender,
        text: messageText,
        groupName: groupName,
        groupId: groupId,
        recipient: creatorUser,
      })
      .then((resp) => resp.data);
    /**
     * Also Call to api to save this request info in postgres db
     * */
  }

  function getMessages(userData) {
    // return axios.get(`${apiBaseUrl}/api/notification/`, getAxiosConfig(userData))
    //   .then(resp => resp.data);
    /**
     * will fetch request list from postgres db
     * **/
    return new Promise(resolve => resolve(PendingRequestData.userResponses))
  }

  function newMessage(message) {
    //if sender is not set in our case, no anonymous messages will be passed!
    // if (!message.sender) {
    //   message.sender = "anonymous";
    // } else {
    messages.push(message);
    setMessages(_.cloneDeep(messages));
    // }
  }

  function getAxiosConfig(userData) {
    const config = {
      headers: { "x-ms-client-principal-name": userData.email },
    };
    return config;
  }

  function getConnectionInfo(userData) {
    return axios
      .post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig(userData))
      .then((resp) => {
        return resp.data;
      });
  }

  const sendNewMessage = (groupId, groupName, creatorUser) => {
    sendMessage(
      userInfo.firstName,
      newMessageText,
      groupId,
      groupName,
      creatorUser
    );
    setNewMessageText("");
  };


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (

    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <Grid container style={{padding:20}}>
        <Grid item xs={12}>
          <h1>
            User Details
          </h1>
        </Grid>
        <Grid item xs={12}>
          <h2>
            Group info
          </h2>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Questions and Answers
          </h3>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Buttons to approve or reject
          </h3>
        </Grid>
      </Grid>


      {/*<List>*/}
      {/*  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
      {/*    <ListItem button key={text}>*/}
      {/*      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
      {/*      <ListItemText primary={text} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
      {/*<Divider />*/}
      {/*<List>*/}
      {/*  {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
      {/*    <ListItem button key={text}>*/}
      {/*      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
      {/*      <ListItemText primary={text} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </div>
  );



  useEffect(()=>{
    getUserInfo().then((userData) => {
      setUserInfo(userData);

      if (userData !== null) {
        console.log("retrieving messages");
        /**
         * Retrieve notifications from db
         * */
        getMessages(userData).then(messages => {
          console.log("messages", messages);
          for (let m of messages.reverse()) {
            newMessage(m);
          }

        })
          .then(()=>setReady(true));
        getConnectionInfo(userData)
          .then((info) => {
            const options = {
              accessTokenFactory: () => info.accessToken,
            };

            const connection = new signalR.HubConnectionBuilder()
              .withUrl(info.url, options)
              .configureLogging(signalR.LogLevel.Information)
              .build();

            connection.on("newMessage", newMessage);
            connection.onclose(() => console.log("disconnected"));
            connection
              .start()
              .then(() => {
                setReady(true);
              })
              .catch(console.error);
          })
          .catch(console.error);
      }
    });
  },[])


  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <List className={classes.root}>
            {
              messages.map((notification,i) => {
                return (
                  <div key={i}>
                    <ButtonBase onClick={toggleDrawer(anchor, true)}>
                    <ListItem alignItems="flex-start" >
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
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                    </ButtonBase>
                   <div>
                 <Divider variant="inset" component="li" />
                   </div>
                 </div>
              )
              })
            }
          </List>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer variant="persistent" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
//
// const drawerWidth = 240;
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }));
//
// export default function Notifications() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="bottom"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </div>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: open,
//         })}
//       >
//         <div className={classes.drawerHeader} />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
//           donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
//           Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//           facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//           tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//           consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
//           vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
//           hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
//           tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//           nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//           accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </main>
//     </div>
//   );
// }
