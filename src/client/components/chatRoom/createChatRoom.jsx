import React, {useState,useEffect} from 'react';
import useStyles from "./chatApp.styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {getUserInfo} from "../../../Authenticator/tokens";
import {getAxiosConfig} from "../../services/chat";
import axios from "axios";
import {getSignalRConnection} from "../../services/chat";
const {createNewGroup} = require("../../services/chat");

const apiBaseUrl = 'http://localhost:7071';

export default function CreateChatRoom(props) {

    const classes = useStyles();

    const [userInfo,setUserInfo] = useState({});
    const [groupInfo,setGroupInfo] = useState({name:'',id:''});


    useEffect(()=>{

        getUserInfo().then(userInfo => {
            console.log("admin: " + userInfo.email);
            setUserInfo(userInfo);
            console.log("userinfo: "  +JSON.stringify(userInfo));
        });
     },[]);

    const handleGroupInfoChange = (prop) => (event) => {
        setGroupInfo({ ...groupInfo, [prop]: event.target.value });
    };
    const handleUserInfoChange = (prop) => (event) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };

    const handleUserInfoSubmit = () => {
        const connection = getSignalRConnection();
        console.log(JSON.stringify(connection));
        return axios.post(`${apiBaseUrl}/api/manageGroup`, {
                sender: userInfo.email,
                groupName: groupInfo.name
        }, getAxiosConfig(userInfo.email)).then(resp => {
            console.log("after adding to group: " + JSON.stringify(resp.data))
            createNewGroup(
                {
                    ...groupInfo,
                    group: groupInfo.name,
                    admin: userInfo.email,
                    created_at: new Date(),
                    members: [userInfo.email],
                    desc: "test description"
                }).then(resp => {
                console.log("New group created in cosmos db");
                console.log("resp after adding new group in cosmos db: " + JSON.stringify(resp));
            })
        });

    }



    return(
        <Box height='89vh'>
            <Grid
                container
                className={classes.root}
                direction="row"
            >
                <Grid item xs={12}>
                    <form  noValidate autoComplete="off" style={{padding:8}}>
                        <Grid container  spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-required"
                                    required
                                    label="Group Name"
                                    value={groupInfo.name}
                                    onChange={handleGroupInfoChange('name')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-number"
                                    label="Group id"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={groupInfo.id}
                                    onChange={handleGroupInfoChange('id')}
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={handleUserInfoSubmit}>
                            Submit
                        </Button>
                    </form>
                </Grid>

            </Grid>
        </Box>
    )

}
