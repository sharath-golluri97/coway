import React, {useState,useEffect,useRef} from 'react';
import {Grid} from '@material-ui/core';
import useStyles from "./chatApp.styles";
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Paper from '@material-ui/core/Paper';
import ChatMessage from "./chatMessage";

export default function ChatApp() {
    const classes = useStyles();
    // to auto scroll to bottom when new msg appears
    const messagesEndRef = useRef(null);

    const [messages,setMessage] = useState([1,1,1,1,1,1,1,1,1]);
    const [newMessage,setNewMessage] = useState({})


    useEffect(()=>{
        scrollToBottom()
    }, [messages]);

    // //For testing auto down scroll
    // setInterval(()=>{
    //     messages.push(1);
    //     setMessage(_.cloneDeep(messages))
    // },1000)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const dummyData = [
        {
            message: "This should be in right ook ok ok k asdfghjkl o  k k kkkkk!! !!",
            sender: "aman"
        },
        {
            message: "This should be in left",
            sender: "user1"
        },
        {
            message: "This should be in left again This should be in right ook ok ok k asdfghjkl o  k k kkkkk!! !!",
            sender: "user2"
        },
        {
            message: "This should be in right",
            sender: "aman"
        },
        {
            message: "This should be in left again",
            sender: "user3"
        },
        {
            message: "This should be in right",
            sender: "aman"
        },
        {
            message: "This should be in left again",
            sender: "user3"
        },

        {
            message: "This should be in right",
            sender: "aman"
        },
        {
            message: "This should be in left again",
            sender: "user3"
        }

    ];


    return(
        <div style={{paddingTop:24+'px'}}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} className={classes.header}>
                    <Card >
                        <CardHeader style={{padding:'0'}}
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <GroupRoundedIcon />
                                </IconButton>
                            }
                            title="Azure Hackathon"
                            subheader="Group Status"
                        />
                    </Card>
                </Grid>
                <Grid  item xs={12} className={classes.content}>
                    <ChatMessage messages={dummyData}/>

                    <div ref={messagesEndRef} />

                </Grid>
                <Grid container item xs={12} className={classes.footer}>
                    <Grid item xs={11}>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Type a message"
                        multiline
                        rowsMax={2}
                        value={newMessage.text}
                        onChange={()=>{console.log("handleChange")}}
                        variant="filled"
                        fullWidth={true}
                        size="small"
                        style={{borderRadius: '10px'}}

                    />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <SendRoundedIcon/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </div>

    )


}

