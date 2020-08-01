import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PendingRequestData from "../events/selection/mocks/getUserGroupInfoForPendingRequest";
import axios from "axios";
import _ from "lodash";
import {getUserInfo} from "../../../Authenticator/tokens";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import {fetchPendingNotifications, acceptPendingRequest, rejectPendingRequest} from "../../services/notifications";

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

  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const apiBaseUrl = "https://ridematechat.azurewebsites.net";

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


  const toggleDrawer = (anchor, open, pr) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if(open)
      setSelectedRequest(pr);
  };


  const acceptRequest = (requestId,anchor) => {
    acceptPendingRequest({request_id: requestId}).then(res => {
      console.log('accepted!')
      init(userInfo);
      setState({ ...state, [anchor]: false });
    })
  }

  const rejectRequest = (requestId,anchor) => {
    rejectPendingRequest({request_id: requestId}).then(res => {
      console.log('rejected!');
      init(userInfo);
      setState({ ...state, [anchor]: false });
    })
  }


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
        <Grid container alignItems='center' item xs={12}>
          <Grid item xs={12}>
            <Typography variant='overline' style={{fontSize:'x-large',color:'grey'}}>
              User
            </Typography>
            <Divider  style={{marginRight: '20vw'}} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='subtitle1'>
              {selectedRequest.user_group_info ? selectedRequest.user_group_info.user.full_name: 'undefined'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
            Email:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='subtitle1'>
            {selectedRequest.user_group_info ? selectedRequest.user_group_info.user.email: 'undefined'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems='center' item xs={12}>
          <Grid item xs={12}>
            <Typography variant='overline' style={{fontSize:'x-large',color:'grey'}}>
              Group
            </Typography>
            <Divider  style={{marginRight: '20vw'}} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography ariant='subtitle1'>
              {selectedRequest.user_group_info ? selectedRequest.user_group_info.group.group_name: 'undefined'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_1 !== "" ?  `Q1. ${selectedRequest.questionnaire.question_1}` : null}
              </Typography>
              </Paper>
             </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_1 !== "" ? (selectedRequest.answer_1!=="" ? selectedRequest.answer_1 : '-') : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_2 !== "" ?  `Q2. ${selectedRequest.questionnaire.question_2}` : null}
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_2 !== "" ? (selectedRequest.answer_2!=="" ? selectedRequest.answer_2 : '-') : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
                {selectedRequest.questionnaire && selectedRequest.questionnaire.question_3 !== "" ?  `Q3. ${selectedRequest.questionnaire.question_3}` : null}
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_3 !== "" ? (selectedRequest.answer_3!=="" ? selectedRequest.answer_3 : '-') : null}
              </Typography>
            </Grid>
          </Grid>

        </Grid>
        <Grid container direction='column'  justify="center"  alignItems="center" item xs={12} style={{height:'10vh'}}>
          <Grid item xs={12}>
            <IconButton size='medium'  style={{color:'greenyellow'}} onClick={()=>acceptRequest(selectedRequest.request_id,anchor)}>
              <CheckCircleIcon style={{fontSize:'4rem'}}/>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <IconButton size='medium' style={{color:'red'}} onClick={()=>rejectRequest(selectedRequest.request_id,anchor)}>
              <CancelIcon style={{fontSize:'4rem'}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );


  const init = (userData) => {
    fetchPendingNotifications({email:userData.email}).then(res => {
      // console.log(JSON.stringify(resp));
      setPendingRequests(res.userResponses);
    })
  }


  useEffect(()=>{
    getUserInfo().then((userData) => {
      setUserInfo(userData);

      if (userData !== null) {
        console.log("retrieving messages");
        /**
         * Retrieve notifications from db
         *
         * */
        init(userData);

        getMessages(userData).then(messages => {
          // console.log("messages", messages);
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
              pendingRequests.map((pr,i) => {
                return (
                  <div key={i}>
                    <ButtonBase onClick={toggleDrawer(anchor,true,pr)}>
                    <ListItem alignItems="flex-start" >
                  <ListItemAvatar>
                    <Avatar alt={pr.user_group_info.user.full_name} src="" />
                  </ListItemAvatar>
                    <ListItemText
                    primary={pr.user_group_info.user.full_name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {pr.user_group_info.group.group_name}
                        </Typography>
                        {"- No  Description"}
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
          <Drawer variant="persistent" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
