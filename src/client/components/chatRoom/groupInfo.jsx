import React, {useState,useEffect} from 'react';
import {Grid,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import 'date-fns'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip';
import {getUserInfo} from "../../../Authenticator/tokens";
import ButtonBase from "@material-ui/core/ButtonBase";
import {getApprovedUserGroups} from "../../services/groups";
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const GroupInfo = (props) =>{

  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({});
  const [ready, setReady] = useState(false);
  const [groups, setGroups] = useState([{}]);

  useEffect(()=>{
    getUserInfo().then(userData => {
      setUserInfo(userData);
      var params = {};
      params['email']=userData.email;
      console.log("params", params);
      getApprovedUserGroups(params).then(resp => {
        setGroups(resp);
        setReady(true);
      });
    })
  },[]);

  return (
    <ShowIfPropTrue prop={ready}>
    <List className={classes.root}>
      <div>
      {
        groups.map((group,key) => {
          return (<div key={key}>
            <ButtonBase style={{width:'100%'}} component={Link} to={'/chatRoom/chat/' + group.group_name} onClick={()=>console.log("navigate now!")}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={group["event"] ? group["event"].name : null } src="" />
            </ListItemAvatar>
            <ListItemText
              primary={group.group_name}
              secondary={
                <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      User 1
                    </Typography>

                </React.Fragment>
              }
            />
            {
              group.status === 1 ?
                <Chip style={{background:'lightgreen'}} size="small" label="ACTIVE"/>
                :
                group.status === 2 ?
                  <Chip style={{background:'lightblue'}} size="small" label="PAUSED"/>
                  :
                  group.status === 3 ?
                    <Chip style={{background:'lightcoral'}} size="small" label="DELETED"/>
                    :
                    <Chip style={{background:'darkgrey'}} size="small" label="EXPIRED"/>
            }
          </ListItem>
            </ButtonBase>

            <Divider variant="inset" component="li" />
          </div>)
        })
      }
      </div>
    </List>
    </ShowIfPropTrue>
  );
}

export default GroupInfo;
