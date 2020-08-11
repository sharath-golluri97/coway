import React, {useState,useEffect,useRef} from 'react';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'
import useStyles from "./chatApp.styles";
import axios from "axios";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ChatMessage from "./chatMessage";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {getUserInfo} from "../../../Authenticator/tokens";
import { v4 as uuidv4 } from 'uuid';
import { getGroupParticipantsDetails } from '../../services/groups';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import SkeleteonChatContent from "./skeletonChatContent";


const signalR = require("@aspnet/signalr");



const ChatApp = (props) => {

    const classes = useStyles();
    TimeAgo.addLocale(en)
    const timeago = new TimeAgo('en-US');
    const groupId = props.match.params.id;

    // to auto scroll to bottom when new msg appears
    const messagesEndRef = useRef(null);

    const [userInfo,setUserInfo] = useState({});
    const [groupInfo, setGroupInfo] = useState({});
    const [newMessageText,setNewMessageText] = useState('');
    const [messages,setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [ready,setReady] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [userValid, setUserValid] = useState(true);

    const sendNewMessage = () => {
        sendMessage(userInfo.username, newMessageText, groupId);
        setNewMessageText('');
    }

    useEffect(()=>{
        scrollToBottom()
    }, [messages,ready]);


    useEffect(()=>{
        getUserInfo().then(userData => {
            setUserInfo(userData);
            var params = {};
            params['id']=groupId;
            getGroupParticipantsDetails(params).then(resp => {
                setGroupInfo(resp);
                setParticipants(resp.user_group_infos);
                var groupUsers = resp.user_group_infos;
                var user_valid = false;
                for(var i=0; i<groupUsers.length; i++){
                    if(groupUsers[i]['user_id']==userData['userId']){
                        user_valid=true;
                    }
                }
                setUserValid(user_valid);
            });
            if (userData !== null) {
                getMessages(userData).then(messages => {
                       for (let m of messages.reverse()) {
                                newMessage(m);
                        }
                  setReady(true);

                });
                getConnectionInfo(userData).then(info => {
                    const options = {
                        accessTokenFactory: () => info.accessToken
                    };

                    const connection = new signalR.HubConnectionBuilder()
                        .withUrl(info.url, options)
                        .configureLogging(signalR.LogLevel.Information)
                        .build();

                    connection.on('newMessage', newMessage);
                    connection.onclose(() => console.log('disconnected'));
                    connection.start()
                        .then(() => {
                            addToGroup(userData);
                        }).catch(console.error);
                }).catch(console.error);
                setInterval(refreshTimes, 1000);
            }
        })
    },[])

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawer(open);
    };

    const list = () => (
    <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
      <Typography style={{padding:5, margin:7}} variant='overline'>Group Participants</Typography>
      <Divider variant='middle'/>
        <List>
        {participants.map((participant) => (
            <ListItem key={participant.user_id}>
            <ListItemIcon>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {participant.user.username.toString().charAt(0)}
                </Avatar>
            </ListItemIcon>
            <ListItemText primary={participant.user.username} />
            </ListItem>
        ))}
        </List>
    </div>
    );

    const scrollToBottom = () => {
        if(messagesEndRef !== null && messagesEndRef.current !== null){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    // Azure SignalR connection configs
    const apiBaseUrl = 'https://ridematechat.azurewebsites.net';

    function getAxiosConfig(userData) {
        const config = {
            headers: {'x-ms-client-principal-name': userData.email}
        };
        return config;
    }
    function getConnectionInfo(userData) {
        return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig(userData))
            .then(resp => {
                return resp.data;
            });
    }

    function addToGroup(userData){
        axios.post(`${apiBaseUrl}/api/manageGroup`, {
            groupName: groupId,
            userId: userData.email,
        }, getAxiosConfig(userData));
    }

    function sendMessage(sender, messageText, groupName) {
        return axios.post(`${apiBaseUrl}/api/messages`, {
            sender: sender,
            text: messageText,
            groupName: groupName,
            group: uuidv4(),
        }).then(resp => resp.data);
    }

    function getMessages(userData) {
        return axios.get(`${apiBaseUrl}/api/messages/` + groupId, getAxiosConfig(userData))
            .then(resp => resp.data);
    }

    function newMessage(message) {
        //if sender is not set in our case, no anonymous messages will be passed!
        if (!message.sender) {
            message.sender = "anonymous";
        }
        else{
        message._ts = message._ts || (new Date().getTime() / 1000);
        message.timeago = timeago.format(new Date(message._ts * 1000));
        messages.push(message);
        setMessages(_.cloneDeep(messages));
        }
    }

    function refreshTimes() {
        messages.forEach(m => m.timeago = timeago.format(new Date(m._ts * 1000)));
    }

    const handleMessageChange = (event) => {
        setNewMessageText(event.target.value);
    };

    return(
        <React.Fragment>
        <ShowIfPropTrue prop={!ready}>
          <div style={{paddingTop:24+'px'}}>
            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={1} className={classes.header}>

              </Grid>
              <Grid item xs={11} className={classes.header}>
                <Card >
                  <Skeleton variant="circle" width={40} height={40} />
                </Card>
              </Grid>
              <Grid  item xs={12} className={classes.content}>
                <SkeleteonChatContent/>
              </Grid>
              <Grid container item xs={12} className={classes.footer}>
                <Grid item xs={11}>
                </Grid>
                <Grid item xs={1}>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </ShowIfPropTrue>

        <ShowIfPropTrue prop={ready & !userValid}>
            <div>
            <Typography>Authorization Error! Please go back to home page and try again.</Typography>
            </div>
        </ShowIfPropTrue>

        <ShowIfPropTrue prop={ready & userValid}>
        <div style={{paddingTop:24+'px'}}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={1} className={classes.header}>
                    <Link to='/chatRoom'>
                    <IconButton>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    </Link>
                </Grid>
                <Grid item xs={11} className={classes.header}>
                    <Card >
                        <CardHeader style={{padding:'0'}}
                            avatar={
                                <Avatar alt={groupInfo["group_name"] ? groupInfo["group_name"].toString().charAt(0) : null } src="" />
                            }
                            action={
                                        <React.Fragment key={'right'}>
                                        <IconButton aria-label="settings" onClick={toggleDrawer(true)}>
                                            <GroupRoundedIcon />

                                        </IconButton>
                                        <Drawer anchor={'right'} open={drawer} onClose={toggleDrawer(false)}>
                                                {list()}
                                            </Drawer>
                                        </React.Fragment>
                            }
                            title={groupInfo.group_name}
                        />
                    </Card>
                </Grid>
                <Grid  item xs={12} className={classes.content}>
                    <ChatMessage messages={messages}/>
                    <div ref={messagesEndRef} />
                </Grid>
                <Grid container item xs={12} className={classes.footer}>
                    <Grid item xs={11}>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Type a message"
                        multiline
                        rowsMax={2}
                        value={newMessageText}
                        onChange={handleMessageChange}
                        variant="filled"
                        fullWidth={true}
                        size="small"
                        style={{borderRadius: '10px'}}
                    />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={sendNewMessage}>
                            <SendRoundedIcon/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </div>
        </ShowIfPropTrue>
        </React.Fragment>
    )
}

export default ChatApp;

