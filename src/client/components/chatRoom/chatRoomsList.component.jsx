import React, {useState,useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, Grid} from "@material-ui/core";
import axios from "axios";
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import ChatRoomListItem from "./chatRoomListItem.component";
import _ from "lodash";
const {queryGroups} = require("../../services/chat")
const {getSignalRConnection} = require("../../services/chat");

const signalR = require("@aspnet/signalr");

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


const ChatRoomsList = (props) => {

    const classes = useStyles();
    const [chatGroupsList, setChatGroupsList] = useState([]);
    const [ready, setReady] = useState(false);
    const [username,setUsername] = useState("");
    const apiBaseUrl = 'http://localhost:7071';
    const axiosConfig = {
        headers: {'x-ms-client-principal-name': username}
    };

    const querySpec = {
            query: "SELECT * from c"
    };

    useEffect(()=>{
        getChatGroups().then(function(chatGroupsResp) {
            chatGroupsResp.forEach(groupUpdated)
        }).then(()=>{
            const connection = getSignalRConnection();
            console.log("connection info in list: " + JSON.stringify(connection));

            connection.on('groupUpdated', groupUpdated)

        })
        // }).then(getUserInfo).then(getConnectionInfo).then(function (info) {
        //     let accessToken = info.accessToken;
        //     const options = {
        //         accessTokenFactory: function() {
        //             if (accessToken) {
        //                 const _accessToken = accessToken
        //                 accessToken = null
        //                 return _accessToken
        //             } else {
        //                 return getConnectionInfo().then(function(info) {
        //                     return info.accessToken
        //                 })
        //             }
        //         }
        //     };
        //
        //     const connection = new signalR.HubConnectionBuilder()
        //         .withUrl(info.url, options)
        //         .build()
        //
        //     connection.on('groupUpdated', groupUpdated)
        //
        //     connection.onclose(function() {
        //         console.log('disconnected')
        //         // setTimeout(function() { startConnection(connection) }, 2000)
        //     })
        //     startConnection(connection)
        // }).then(()=>setReady(true));
    },[]);


    function getUserInfo(){
        let username = prompt("Enter username");
        setUsername(username);
    }

    function getChatGroups() {
            return axios.post(`${apiBaseUrl}/api/GetChatGroups`, null, axiosConfig)
                .then(function(resp) { return resp.data })
                .catch(function() { return {} })
        }

    // function getChatGroups(){
    //     return  queryGroups(querySpec).then(function (resp) {
    //                 return resp;
    //     })
    // }

    function groupUpdated(updatedGroup) {
        console.log("db update triggered!")
        let groupIndex = chatGroupsList.findIndex(g => g.id === updatedGroup.id);
        if (groupIndex >-1) {
            chatGroupsList[groupIndex] = updatedGroup;
        } else {
            chatGroupsList.push(updatedGroup)
        }
        setChatGroupsList(_.cloneDeep(chatGroupsList));
        console.log("chat room list: " + JSON.stringify(chatGroupsList));
    }

    function startConnection(connection) {
        console.log('connecting...')
        connection.start()
            .then(function() { console.log('connected!') })
            .catch(function(err) {
                console.error(err)
                setTimeout(function() { startConnection(connection) }, 2000)
            })
    }

    function getConnectionInfo() {
        return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, axiosConfig)
            .then(function(resp) { return resp.data })
            .catch(function() { return {} })
    }

    return (
        <Container disableGutters>
            <Box height='100vh' >
                 <ShowIfPropTrue prop={true}>
                <Grid
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="center"
                    style={{position:'fixed'}}
                    spacing={2}
                >
            {chatGroupsList.map((element,i) =>
                (
                    <Grid item xs={12} key={i} >
                        <ChatRoomListItem chatRoomInfo={element.group_name}/>
                    </Grid>
                )
            )}
                </Grid>
                </ShowIfPropTrue>
            </Box>
        </Container>


    )

}

export default ChatRoomsList;
