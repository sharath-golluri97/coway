import React, { useState, useEffect } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import EventCardStyles from "./eventCard.styles";
import { getDateTime } from "../../../../utils/dateTimeTools";
import { reverseGeocode } from "../../../../utils/osmReverseGeocode";
import ShowIfPropTrue from "../../../../commons/showPropIf/showPropIf";
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { InputLabel, TextField } from '@material-ui/core';
import { getUserInfo } from '../../../../../Authenticator/tokens';
import { createJoinRequest } from '../../../../services/responses';
import MuiAlert from '@material-ui/lab/Alert';
import HomePage from "../../../homePage/homePage.component";
import Grow from '@material-ui/core/Grow';


const EventCard = (props) => {
  const classes = EventCardStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [expanded, setExpanded] = useState(false);
  const [request, setRequest] = useState(props.requestStatus);
  const [favorite] = useState(props.favoriteEvent);
  const [anonymous] = useState(props.anonymous);
  const [userInfo, setUserInfo] = useState({});
  const [groupInfo] = useState(props);
  const [startEvent, setStartEvent] = useState({});
  const [, setEndEvent] = useState({});
  const [dest, setDest] = useState('');
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [ready, setReady] = useState(false);
  const [groupStatus, setGroupStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shareText, setShareText] = useState('');

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const handleRequestClick = () => {
    if (!request) {
      //POST call .then()
      setRequest(!request);
      return;
    }
    if (props.joinStatus) {
      console.log("navigating to chat room");
      return;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit called', a1, a2, a3, userInfo);
    //todo: make call with all details
    var user = {};
    var group = {};
    var user_responses = {};
    user['id'] = userInfo['userId'];
    group['id'] = groupInfo['id'];
    group['questionnaire_id'] = groupInfo.questionnaire_id;
    user_responses['answer_1'] = a1;
    user_responses['answer_2'] = a2;
    user_responses['answer_3'] = a3;
    var request = {};
    request['user'] = user;
    request['group'] = group;
    request['user_responses'] = user_responses;
    console.log("save request..", request);
    createJoinRequest(request).then(resp => {
      if (resp == "CREATED") {
        setSuccess(true);
        setOpen(true);
      }
      else {
        setFailure(true);
        setOpen(true);
      }
    }
    )
  };

  useEffect(() => {
    let eventStart = getDateTime(new Date(groupInfo.event.event_start_time));
    let eventEnd = getDateTime(new Date(groupInfo.event.event_end_time));
    let userGroupStatus = 'PENDING';
    if ('user_group_infos' in groupInfo && groupInfo.user_group_infos[0].user_group_status.status) {
      userGroupStatus = groupInfo.user_group_infos[0].user_group_status.status;
    }
    setStartEvent({ date: eventStart.date, time: eventStart.time });
    setEndEvent({ date: eventEnd.date, time: eventEnd.time });
    setGroupStatus(userGroupStatus);
    var eventTimeReadable = new Date(groupInfo.event.event_start_time).toDateString();
    setShareText("Hi, %0a %0a Join me on RideMate for " + groupInfo.event.name + " ( "
     + groupInfo.event.description + " ) on " + eventTimeReadable  +
     " . %0a %0a Visit RideMate for details now: " +
     "https://ridemate.in/#/events/" + groupInfo['id']);
    reverseGeocode(groupInfo.event.latitude, groupInfo.event.longitude)
      .then(resp => resp.address.suburb)
      .then(location => {
        setDest(location);
        getUserInfo().then(userData => {
          setUserInfo(userData);
          if (userData !== null) {
            setReady(true);
          }
        });

      });
  }, []);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <ShowIfPropTrue prop={success}>
        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Your join request was sent successfully!
              Once the admin approves your request, you can chat with them by visiting "My Groups".
            </Alert>
          </Snackbar>
          <HomePage />
        </div>
      </ShowIfPropTrue>

      <ShowIfPropTrue prop={failure}>
        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Something went wrong, please write to us and report!
            </Alert>
          </Snackbar>
        </div>
      </ShowIfPropTrue>

      <Grow in={ready}>
        <Card className={classes.root} variant="outlined">
          <CardHeader
            action={
              groupStatus == "ACTIVE" || groupStatus == "ADMIN" ?
                <Link to={'/chatRoom/chat/' + groupInfo.id}>

                  <IconButton style={{ zIndex: 1 }}
                    aria-label="chat or join"
                    onClick={handleRequestClick}
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                </Link>
                :
                (groupStatus == "PENDING" ?
                  <IconButton style={{ zIndex: 1 }}
                    aria-label="chat or join"
                    onClick={handleRequestClick}
                  >
                    <CheckCircleOutlineIcon style={{ color: "#ff9900" }} />
                  </IconButton>
                  :
                  <IconButton style={{ zIndex: 1 }}
                    aria-label="chat or join"
                    onClick={handleRequestClick}
                  >
                    <GroupAddOutlinedIcon />
                  </IconButton>
                )
            }
            title={
              <Typography gutterBottom variant="h6" component="h2">
                {props.event.name}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" color="textSecondary">
                {startEvent.time} | {startEvent.date}
              </Typography>
            }
            disableTypography={true}
          />
          <CardContent style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <div style={{display:"flex"}}>
            <Typography variant="body2" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body2" gutterBottom>
              {groupInfo.event.description}
            </Typography>
          </div>
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
              style={{ fontSize: 'smaller' }}
            >
              {
                groupInfo.event.event_type_id == 1 ?
                  <span>
                    {groupInfo.event.city.airport_id}
                    <LocalAirportIcon style={{ fontSize: '0.8rem' }} />
                  </span>
                  :
                  groupInfo.event.city.name
              }
              {bull}  {dest} {bull}   {groupInfo.event.max_participants}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions disableSpacing style={{ paddingTop: '2px', paddingBottom: '5px' }}>
            <IconButton aria-label="share"
              style={{ zIndex: 1, paddingTop: 2, paddingBottom: 2 }}
            >
              <a href={"https://api.whatsapp.com/send?text=" + shareText} data-action="share/whatsapp/share">
                <ShareIcon fontSize={'small'} />
              </a>
            </IconButton>

            <IconButton
              style={{ zIndex: 1, paddingTop: 2, paddingBottom: 2 }}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon fontSize={'small'} />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <div style={{display:"flex"}}>
              <Typography paragraph style={{ fontSize: 'medium' }}>
                Remarks:
              </Typography>
              <Typography paragraph style={{ fontSize: 'medium' }}>
                {groupInfo.event.remarks || 'None'}
              </Typography>
            </div>
              <ShowIfPropTrue prop={anonymous}>
                <div>
                  <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <InputLabel htmlFor="component-simple">{props.questionnaire.question_1}</InputLabel>
                    <TextField
                      variant="outlined"
                      onChange={e => setA1(e.target.value)}
                    />
                    <div>
                      <ShowIfPropTrue prop={props.questionnaire.question_2}>
                        <div>
                          <InputLabel htmlFor="component-simple">{props.questionnaire.question_2}</InputLabel>
                          <TextField
                            variant="outlined"
                            onChange={e => setA2(e.target.value)}
                          />
                        </div>
                      </ShowIfPropTrue>
                    </div>
                    <div>
                      <ShowIfPropTrue prop={props.questionnaire.question_3}>
                        <InputLabel htmlFor="component-simple">{props.questionnaire.question_3}</InputLabel>
                        <TextField
                          variant="outlined"
                          onChange={e => setA3(e.target.value)}
                        />
                      </ShowIfPropTrue>
                    </div>
                    <Button
                      type='submit'
                      className={classes.button}
                      variant='contained'
                      color='primary'
                    >
                      Submit
                  </Button>
                  </form>
                </div>
              </ShowIfPropTrue>

            </CardContent>
          </Collapse>
        </Card>

      </Grow>
    </Grid>
  );
}

export default EventCard;
