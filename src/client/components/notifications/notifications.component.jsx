import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
