import React, {useState,useEffect} from 'react';
import ChatRoomsList from "./chatRoomsList.component";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";
import useStyles from "./chatApp.styles";
import Paper from '@material-ui/core/Paper';


import {getUserInfo} from "../../../Authenticator/tokens";

const {createNewGroup,connectToSignalR} = require("../../services/chat");
// const {getUserInfo} = require("./../../../Authenticator/tokens");

// import _ from "lodash";



export default function ChatApp(props) {

    const classes = useStyles();


    const apiBaseUrl = 'http://localhost:7071';
    const hubName = 'chat';
    // const [groupInfo,setGroupInfo] = useState({});
    const [userInfo,setUserInfo] = useState({});
    // // const userInfo = {};
    // // const groupInfo = {};
    // const [showGroupList,setShowGroupList] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [isLocalhost, setIsLocalhost] = useState(/\/\/localhost/.test(apiBaseUrl));

    useEffect(()=>{

        getUserInfo().then(userInfo => {
            console.log("called here");
            if (isLocalhost || authenticated) {
                connectToSignalR(userInfo.email).then((connection) => {
                    // connection.on('newMessage', onNewMessage);
                    console.log("connection info : " + JSON.stringify(connection));
                    console.log("connection established in chatApp!");

                });
            }
        });

    },[]);
    //
    // const handleUserInfoChange = (prop) => (event) => {
    //     setUserInfo({ ...userInfo, [prop]: event.target.value });
    // };
    //
    // const handleGroupInfoChange = (prop) => (event) => {
    //     setGroupInfo({ ...groupInfo, [prop]: event.target.value });
    // };
    //
    // const handleUserInfoSubmit = () => {
    //     //do something
    //
    // };
    // // const handleChange = (prop) => (event) => {
    // //     setUserInfo({ ...userInfo, [prop]: event.target.value });
    // // };
    //
    // const getGroupInfo = () => {
    //     // let inputGroupInfo = {};
    //     // inputGroupInfo.name = prompt("Enter Group Name");
    //     // inputGroupInfo.desc = prompt("Enter Group Description");
    //     // inputGroupInfo.id = prompt("Enter Group id");
    //     // inputGroupInfo.group = inputGroupInfo.name;
    //     // inputGroupInfo.admin = userInfo.name;
    //     // inputGroupInfo.members = [userInfo.id];
    //     // inputGroupInfo.created_at = new Date();
    //     //
    //     // setGroupInfo(inputGroupInfo);
    //     // groupInfo.name = prompt("Enter Group Name");
    //     // groupInfo.desc = prompt("Enter Group Description");
    //     // groupInfo.id = prompt("Enter Group id");
    //     groupInfo.group = groupInfo.name;
    //     groupInfo.admin = userInfo.name;
    //     groupInfo.members = [userInfo.id];
    //     groupInfo.created_at = new Date();
    //
    //     console.log("group info here: "  + JSON.stringify(groupInfo));
    //    // createNewGroup(groupInfo).then((response)=>{
    //    //      return response;
    //    //  })
    // }


    return (
        <Box height='89vh'>
            <Grid
                container
                className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Paper variant="outlined" >
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button><Link to="/chat/create">Create Group</Link></Button>
                            <Button>Search Group</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <ChatRoomsList/>
                </Grid>
            </Grid>
        </Box>
    )

}
