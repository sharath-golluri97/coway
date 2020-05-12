import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";

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

export default function AlignItemsList(props) {
    const classes = useStyles();

    const [messageList, setMessageList] = useState(props.listArr);


    return (
        <List className={classes.root}>
            {props.listArr.map((element,i) =>
            (
                <ListItem alignItems="flex-start" divider={true} key={i}>
                <ListItemAvatar>
                    <IconButton color="primary" aria-label="send message" onClick={()=>{}} style={{padding:0}}>
                        <Avatar alt={element.sender} src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </ListItemAvatar>
                <ListItemText
                    primary={element.text}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                {element.sender}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            )
            )}
        </List>

    );
}
