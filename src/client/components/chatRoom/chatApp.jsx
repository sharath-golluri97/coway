import React, {useState,useEffect} from 'react';
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import ChatRoomsList from "./chatRoomsList.component";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserInfoForm from "./userInfoForm";
const {createNewGroup,connectToSignalR} = require("../../services/chat");
// import _ from "lodash";



export default function ChatApp(props) {

    const apiBaseUrl = 'http://localhost:7071';
    const hubName = 'chat';
    const [groupInfo,setGroupInfo] = useState({});
    const [userInfo,setUserInfo] = useState("");
    // const userInfo = {};
    // const groupInfo = {};
    const [showGroupList,setShowGroupList] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [isLocalhost, setIsLocalhost] = useState(/\/\/localhost/.test(apiBaseUrl));


    var createGroup = "";

    useEffect(()=>{
        // getUserInfo();
        if(isLocalhost || authenticated) {
            connectToSignalR(userInfo.name).then((connection) => {
               // connection.on('newMessage', onNewMessage);
                console.log("connection info : " + JSON.stringify(connection));
                console.log("connection established in chatApp!");
                //createGroup = prompt("Do you want to create group?");
                // if (createGroup.toLowerCase() === "yes") {
                //     // getGroupInfo();
                // } else {
                //     setShowGroupList(true);
                // }
            });

        }

    },[]);

    const handleUserInfoChange = (prop) => (event) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };

    const handleGroupInfoChange = (prop) => (event) => {
        setGroupInfo({ ...groupInfo, [prop]: event.target.value });
    };

    const handleUserInfoSubmit = () => {
        //do something

    };
    // const handleChange = (prop) => (event) => {
    //     setUserInfo({ ...userInfo, [prop]: event.target.value });
    // };

    const getGroupInfo = () => {
        // let inputGroupInfo = {};
        // inputGroupInfo.name = prompt("Enter Group Name");
        // inputGroupInfo.desc = prompt("Enter Group Description");
        // inputGroupInfo.id = prompt("Enter Group id");
        // inputGroupInfo.group = inputGroupInfo.name;
        // inputGroupInfo.admin = userInfo.name;
        // inputGroupInfo.members = [userInfo.id];
        // inputGroupInfo.created_at = new Date();
        //
        // setGroupInfo(inputGroupInfo);
        // groupInfo.name = prompt("Enter Group Name");
        // groupInfo.desc = prompt("Enter Group Description");
        // groupInfo.id = prompt("Enter Group id");
        groupInfo.group = groupInfo.name;
        groupInfo.admin = userInfo.name;
        groupInfo.members = [userInfo.id];
        groupInfo.created_at = new Date();

        console.log("group info here: "  + JSON.stringify(groupInfo));
       // createNewGroup(groupInfo).then((response)=>{
       //      return response;
       //  })
    }


    return (
        <UserInfoForm
            userInfo={userInfo}
            groupInfo={groupInfo}
            handleUserInfoChange={handleUserInfoChange}
            handleGroupInfoChange={handleGroupInfoChange}
        />

    )


}
