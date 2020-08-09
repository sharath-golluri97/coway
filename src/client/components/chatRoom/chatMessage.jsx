import React, {useState,useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import useStyles from "./chatApp.styles";
import {Grid} from '@material-ui/core';
import {getUserInfo} from "../../../Authenticator/tokens";
import Typography from "@material-ui/core/Typography";
const ChatMessage = (props) =>{
    const classes = useStyles();
    const [userInfo,setUserInfo] = useState({});

    useEffect(()=>{
        getUserInfo().then(userData => {
            setUserInfo(userData);
        });
    },[]);

    return(
        props.messages.map((message,i)=>
            <div key={i}>

                {
                    message.sender === userInfo.username?
                        <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
                            <Grid item xs={8}>
                                <Paper className={classes.messageMe} variant="elevation"  elevation={4}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <Typography className={classes.sender} variant='overline'>
                                                {message.sender}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant={'body2'}>
                                                {message.text}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='caption'>
                                    {message.timeago}
                                </Typography>
                            </Grid>
                        </Grid>
                    :
                        <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
                            <Grid item xs={8}>
                                <Paper className={classes.messageOther} variant="elevation" elevation={4}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant='overline' className={classes.sender}>
                                                {message.sender}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant={'body2'}>
                                                {message.text}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='caption'>
                                    {message.timeago}
                                </Typography>
                            </Grid>
                        </Grid>
                }
            </div>
        )
    )

}

export default ChatMessage;
