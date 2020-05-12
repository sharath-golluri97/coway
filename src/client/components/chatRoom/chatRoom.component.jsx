import React, {useState,useEffect,useRef} from "react";
import {useParams,useRouteMatch} from 'react-router-dom';
import _ from "lodash"
import axios from "axios";
import {TextField, Grid, Box,Container} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import useStyles from "../../commons/appBar/appBar.styles";
import AlignItemsList from "./chatMessageList.component";
const signalR = require("@aspnet/signalr");



const ChatRoom = (props) => {
    // const [loading, error] = useScript({ src: 'https://js.stripe.com/v3/' });
    const classes = useStyles();
    const hubName = 'chat';
    const apiBaseUrl = 'http://localhost:7071';
    const authProvider = 'aad'; // aad, twitter, microsoftaccount, google, facebook


    const [authenticated, setAuthenticated] = useState(false);
    const [isLocalhost, setisLocalhost] = useState(/\/\/localhost/.test(apiBaseUrl));
    const [username, setUsername] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ready, setReady] = useState(true);
    const [loginUrl, setLoginUrl] = useState(`${apiBaseUrl}/.auth/login/${authProvider}?post_login_redirect_url=${encodeURIComponent(window.location.href)}`);
    const [logoutUrl, setLogoutUrl] = useState(`${apiBaseUrl}/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.href)}`);

    useEffect(() => {
         getAuthInfo().then(()=>{
            if (isLocalhost || authenticated) {
                getConnectionInfo().then(info => {
                    info.accessToken = info.accessToken || info.accessKey;
                    info.url = info.url || info.endpoint;
                    setReady(true);
                    const options = {
                        accessTokenFactory: () => info.accessToken
                    };

                    const connection = new signalR.HubConnectionBuilder()
                        .withUrl(info.url, options)
                        .configureLogging(signalR.LogLevel.Information)
                        .build();


                    connection.on('newMessage', onNewMessage);
                    connection.onclose(() => console.log('disconnected'));

                    console.log('connecting...');
                    connection.start()
                        .then(() => console.log("connected!"))
                        .catch(console.error);
                }).catch(alert);

            }

        })

        scrollToBottom();

    },[]);

    function getAuthInfo(){
        // return axios.post(`${apiBaseUrl}/.auth/me`, null, axiosConfig)
        //     .then(() => this.authenticated = true, () => null);
        var user = prompt("Enter your username");
        var grpName = prompt("Enter group name");
        setUsername(user);
        let authToken = "";

        // if (window.location.hash) {
        //     const match = window.location.hash.match(/\btoken=([^&]+)/);
        //     if (match && match[1]) {
        //         authToken = JSON.parse(decodeURIComponent(match[1])).authenticationToken;
        //         sessionStorage.setItem('authToken', authToken);
        //         history.pushState("", document.title, window.location.pathname + window.location.search);
        //     }
        // }

        if (!authToken) {
            authToken = sessionStorage.getItem('authToken');
        }

        window.auth = {
            token: authToken,
            loginUrl: `${apiBaseUrl}/.auth/login/${authProvider}?session_mode=token&post_login_redirect_url=` +
                encodeURIComponent(window.location.href),
            logout: function() {
                sessionStorage.removeItem('authToken');
                window.location.reload();
            }
        };
        return new Promise((resolve,reject) => {
            setAuthenticated(true);
            resolve();
        })
    }

    function sendMessage(sender, recipient, messageText) {
        return axios.post(`${apiBaseUrl}/api/messages`, {
            recipient: recipient,
            sender: sender,
            text: messageText
        }, getAxiosConfig()).then(resp => resp.data);
    }


    function getConnectionInfo() {
        return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig())
            .then(resp => resp.data);
    }



    function sendNewMessage(){
        sendMessage(username,null,newMessage);
        setNewMessage('');
    }


    function login() {
        window.location.href = loginUrl;
    }
    function logout() {
        window.location.href = logoutUrl;
    }

    let counter = 0;
    function onNewMessage(message) {
        if (!message.sender) {
            message.sender = "anonymous";
        }
        message.id = counter++; // react transitions need an id

        messages.push(message);
        const messagesClone = _.cloneDeep(messages);
        setMessages(messagesClone);

        console.log("message recieved!")
    }

    function sendPrivateMessage(recipient) {
        const messageText = prompt('Send private message to ' + recipient);
        if(messageText){
            sendMessage(username,recipient,messageText);
        }
    }

    function getAxiosConfig() {
        const config = {
            headers: {'x-ms-client-principal-name': username}
        };
        if (window.auth.token) {
            config.headers['X-ZUMO-AUTH'] = window.auth.token;
        }
        return config;
    }



    const handleMessageInputChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSendMessageButton = () =>{
        sendNewMessage();
    }

    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    let {roomId} = useParams();

    return (
        <Container disableGutters>
            <Box height='100vh'>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
                style={{position:'fixed'}}
                // classes={{height: '100vh'}}
            >
            <Grid item xs={12} className="container" >
            {/*    Chat header */}
            <h3>Temporary ChatRoom: {roomId}</h3>
            <ShowIfPropTrue prop={!isLocalhost}>
                <ShowIfPropTrue prop={authenticated}>
                    You are logged in
                </ShowIfPropTrue>
            </ShowIfPropTrue>
            </Grid>
            <Grid item xs={12} style={{overflowWrap:'break-word', overflowY:'scroll',width:100+'%'}} >
            {/*    Message list body*/}
            <div style={{height:'74vh', padding:5+'px'}}>
                <ShowIfPropTrue prop={ready}>
                    <div>
                        <AlignItemsList listArr={messages}/>
                        <div ref={messageEndRef}></div>
                    </div>
                </ShowIfPropTrue>
            </div>
            </Grid>
            <Grid item xs={12} style={{width:100+'%',paddingLeft:10+'px'}} >
                <ShowIfPropTrue prop={(isLocalhost || authenticated) && ready}>
                    <div className="signalr-demo col-sm">
                        <Box margin-left='2px'>
                            <form  noValidate autoComplete="off">
                                <Grid container spacing={1} alignItems="center" >
                                    <Grid item xs={10}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            // label="Multiline"
                                            multiline
                                            rowsMax={1}
                                            fullWidth
                                            placeholder="Type a message"
                                            variant="outlined"
                                            value={newMessage}
                                            onChange={handleMessageInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton color="primary" aria-label="send message" onClick={handleSendMessageButton}>
                                            <SendIcon fontSize="large" color="primary"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </div>
                </ShowIfPropTrue>
                <ShowIfPropTrue prop={(isLocalhost || authenticated) && !ready}>
                    <div class="col-sm">
                        <div>Loading...</div>
                    </div>
                </ShowIfPropTrue>
            </Grid>


            <ShowIfPropTrue props={(isLocalhost || authenticated) && !ready}>
                <div className="row" >
                    <div className="col-sm">
                        <div>Loading...</div>
                    </div>
                </div>
            </ShowIfPropTrue>

            </Grid>

        </Box>
        </Container>


    );

}

export default ChatRoom;
