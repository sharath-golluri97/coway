import React, {useState,useEffect,useRef} from 'react';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'
import useStyles from "./chatApp.styles";
import axios from "axios";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import ChatMessage from "./chatMessage";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {getUserInfo} from "../../../Authenticator/tokens";
const signalR = require("@aspnet/signalr");

export default function ChatApp(props) {
    const classes = useStyles();
    TimeAgo.addLocale(en)
    const timeago = new TimeAgo('en-US')

    //to get the group Name from previous route i.e /chatCustom (groupInfo)
    const {data} = props.location;

    // to auto scroll to bottom when new msg appears
    const messagesEndRef = useRef(null);

    const [userInfo,setUserInfo] = useState({});
    const [newMessageText,setNewMessageText] = useState('');
    const [messages,setMessages] = useState([]);
    const [ready,setReady] = useState(false);


    const sendNewMessage = () => {
        sendMessage(userInfo.firstName,newMessageText);
        setNewMessageText('');
    }


    useEffect(()=>{
        scrollToBottom()
    }, [messages]);


    useEffect(()=>{
        getUserInfo().then(userData => {
            setUserInfo(userData);
            if (userInfo !== null) {
                setReady(true);
                console.log('retrieving messages');
                getMessages().then(messages => {
                    for (let m of messages.reverse()) {
                        newMessage(m);
                    }
                });
                getConnectionInfo().then(info => {
                    const options = {
                        accessTokenFactory: () => info.accessToken
                    };
                    const connection = new signalR.HubConnectionBuilder()
                        .withUrl(info.url, options)
                        .configureLogging(signalR.LogLevel.Information)
                        .build();

                    connection.on('newMessage', newMessage);
                    connection.onclose(() => console.log('disconnected'));
                    console.log('connecting...');
                    connection.start()
                        .then(() => console.log('connected!'))
                        .catch(console.error);

                }).catch(console.error);
                setInterval(refreshTimes, 1000);
            }
        })


    },[])

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }


    // Azure SignalR connection configs
    const apiBaseUrl = 'http://localhost:7071';
    const hubName = 'chat';

    function getAxiosConfig() {
        const config = {
            headers: {'x-ms-client-principal-name': userInfo.email}
        };
        return config;
    }
    function getConnectionInfo() {
        return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig())
            .then(resp => resp.data);
    }

    function sendMessage(sender, messageText) {
        return axios.post(`${apiBaseUrl}/api/messages`, {
            sender: sender,
            text: messageText,
            group_name: data,
            group: uuidv4(),
        }, getAxiosConfig()).then(resp => resp.data);
    }
    function getMessages() {
        return axios.get(`${apiBaseUrl}/api/messages`, getAxiosConfig())
            .then(resp => resp.data);
    }

    function newMessage(message) {
        if (!message.sender) {
            message.sender = "anonymous";
        }
        message._ts = message._ts || (new Date().getTime() / 1000);
        message.timeago = timeago.format(new Date(message._ts * 1000));
        messages.push(message);
        setMessages(_.cloneDeep(messages));
    }
    function refreshTimes() {
        messages.forEach(m => m.timeago = timeago.format(new Date(m._ts * 1000)));
    }

    const handleMessageChange = (event) => {
        setNewMessageText(event.target.value);
    };

    return(
        <div style={{paddingTop:24+'px'}}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={1} className={classes.header}>
                    <Link to='/chatCustom'>
                    <IconButton>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    </Link>
                </Grid>
                <Grid item xs={11} className={classes.header}>
                    <Card >
                        <CardHeader style={{padding:'0'}}
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    A
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <GroupRoundedIcon />
                                </IconButton>
                            }
                            title={data}
                            subheader="Group Status"
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

    )


}

