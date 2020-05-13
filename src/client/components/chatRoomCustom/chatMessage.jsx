import React, {useState,useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import useStyles from "./chatApp.styles";
import {Grid} from '@material-ui/core';

const ChatMessage = (props) =>{
    const classes = useStyles();


    return(
        props.messages.map((message,i)=>
            <div key={i}>

                {
                    message.sender === 'aman' ?
                        <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
                            <Grid item xs={8}>
                                <Paper className={classes.messageMe} variant="elevation"  elevation={4}>
                                    {message.message}
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                {message.sender}
                            </Grid>
                        </Grid>
                    :
                        <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
                            <Grid item xs={8}>
                                <Paper className={classes.messageOther} variant="elevation" elevation={4}>
                                    {message.message}
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                {message.sender}
                            </Grid>
                        </Grid>

                }
            </div>
        )
    )

}

export default ChatMessage;
