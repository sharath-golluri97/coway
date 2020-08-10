import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import {getUserInfo} from "../../../Authenticator/tokens";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import {fetchPendingNotifications, acceptPendingRequest, rejectPendingRequest} from "../../services/notifications";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Snackbar} from "@material-ui/core";
import HomePage from "../homePage/homePage.component";
import MuiAlert from "@material-ui/lab/Alert";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Notifications() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [userInfo, setUserInfo] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [ready,setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const toggleDrawer = (anchor, open, pr) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if(open)
      setSelectedRequest(pr);
  };


  const acceptRequest = (requestId,anchor) => {
    setReady(false);
    setState({ ...state, [anchor]: false });

    acceptPendingRequest({request_id: requestId}).then((resp) => {
      // TODO: if res.data is { 'status': 'FAILED' } or res.status is 400 ... give a alert that limit reached and reject!
      console.log("resp from accept! :" + JSON.stringify(resp));
      if (resp == "CREATED") {
        setSuccess(true);
        setOpen(true);
        console.log('accepted!')
      }
      else {
        setFailure(true);
        setOpen(true);
      }
      init(userInfo);
      setReady(true);

    })
  }

  const rejectRequest = (requestId,anchor) => {
    setReady(false);
    setState({ ...state, [anchor]: false });

    rejectPendingRequest({request_id: requestId}).then(() => {
      console.log('rejected!');
      init(userInfo);
      setReady(true)
    })
  }


  const list = (anchor) => (

    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <Grid container style={{padding:20}}>
        <Grid container alignItems='center' item xs={12}>
          <Grid item xs={12}>
            <Typography variant='overline' style={{fontSize:'x-large',color:'grey'}}>
              User
            </Typography>
            <Divider  style={{marginRight: '20vw'}} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='subtitle1'>
              {selectedRequest.user_group_info ? selectedRequest.user_group_info.user.full_name: 'undefined'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
            Email:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='subtitle1'>
            {selectedRequest.user_group_info ? selectedRequest.user_group_info.user.email: 'undefined'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems='center' item xs={12}>
          <Grid item xs={12}>
            <Typography variant='overline' style={{fontSize:'x-large',color:'grey'}}>
              Group
            </Typography>
            <Divider  style={{marginRight: '20vw'}} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6'>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography ariant='subtitle1'>
              {selectedRequest.user_group_info ? selectedRequest.user_group_info.group.group_name: 'undefined'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_1 !== "" ?  `Q1. ${selectedRequest.questionnaire.question_1}` : null}
              </Typography>
              </Paper>
             </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_1 !== "" ? (selectedRequest.answer_1!=="" ? selectedRequest.answer_1 : '-') : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_2 !== "" ?  `Q2. ${selectedRequest.questionnaire.question_2}` : null}
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_2 !== "" ? (selectedRequest.answer_2!=="" ? selectedRequest.answer_2 : '-') : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Paper style={{background:'lightblue'}}>
              <Typography variant='caption' style={{fontSize:'large'}}>
                {selectedRequest.questionnaire && selectedRequest.questionnaire.question_3 !== "" ?  `Q3. ${selectedRequest.questionnaire.question_3}` : null}
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' style={{fontSize:'larger'}}>
              {selectedRequest.questionnaire && selectedRequest.questionnaire.question_3 !== "" ? (selectedRequest.answer_3!=="" ? selectedRequest.answer_3 : '-') : null}
              </Typography>
            </Grid>
          </Grid>

        </Grid>
        <Grid container direction='column'  justify="center"  alignItems="center" item xs={12} style={{height:'10vh'}}>
          <Grid item xs={12}>
            <IconButton size='medium'  style={{color:'greenyellow'}} onClick={()=>acceptRequest(selectedRequest.request_id,anchor)}>
              <CheckCircleIcon style={{fontSize:'4rem'}}/>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <IconButton size='medium' style={{color:'red'}} onClick={()=>rejectRequest(selectedRequest.request_id,anchor)}>
              <CancelIcon style={{fontSize:'4rem'}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );


  const init = (userData) => {
    setReady(false);
    fetchPendingNotifications({email:userData.email}).then(res => {
      // console.log(JSON.stringify(resp));
      setPendingRequests(res.userResponses);
      setReady(true);
    })
  }


  useEffect(()=>{
    getUserInfo().then((userData) => {
      setUserInfo(userData);

      if (userData !== null) {
        console.log("retrieving messages");
        /**
         * Retrieve notifications from db
         *
         * */
        init(userData);

      }
    });
  },[])


  return (
    <div style={{height:'100%'}}>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div>
            <ShowIfPropTrue prop={ready&&success}>
              <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Request accepted!
                  </Alert>
                </Snackbar>
                <HomePage />
              </div>
            </ShowIfPropTrue>
            <ShowIfPropTrue prop={ready&&failure}>
              <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    Sorry, this group has already reached the max participants limit!
                  </Alert>
                </Snackbar>
              </div>
            </ShowIfPropTrue>
          </div>
          <ShowIfPropTrue prop={!ready}>
            <Grid container item direction='column' alignItems='center' justify='center' style={{height:'100%'}}>
              <Loader
                type="Circles"
                color="#00BFFF"
                height={40}
                width={40}
              />
            </Grid>
          </ShowIfPropTrue>
          <ShowIfPropTrue prop={ready}>
          <List className={classes.root}>
          <ShowIfPropTrue prop={pendingRequests.length==0}>
            <Typography variant={"h5"}>
              You don't have any pending notifications.
            </Typography>
          </ShowIfPropTrue>
            {
              pendingRequests.map((pr,i) => {
                return (
                  <div key={i}>
                    <ButtonBase style={{width:'100%'}} onClick={toggleDrawer(anchor,true,pr)}>
                    <ListItem alignItems="flex-start" >
                  <ListItemAvatar>
                    <Avatar alt={pr.user_group_info.user.full_name} src="" />
                  </ListItemAvatar>
                    <ListItemText
                    primary={pr.user_group_info.user.full_name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {pr.user_group_info.group.group_name}
                        </Typography>
                        {"- No  Description"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                    </ButtonBase>
                   <div>
                 <Divider variant="inset" component="li" />
                   </div>
                 </div>
              )
              })
            }
          </List>
          </ShowIfPropTrue>
          <Drawer variant="persistent" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
