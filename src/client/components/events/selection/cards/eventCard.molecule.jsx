import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import EventCardStyles from "./eventCard.styles";
import {getDateTime} from "../../../../utils/dateTimeTools";
import {reverseGeocode} from "../../../../utils/osmReverseGeocode";
import ShowIfPropTrue from "../../../../commons/showPropIf/showPropIf";
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import {Link} from "react-router-dom";

const EventCard = (props) => {
  const classes = EventCardStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [expanded, setExpanded] = useState(false);
  const [request, setRequest] = useState(props.requestStatus);
  const [favorite, setFavorite] = useState(props.favoriteEvent);
  const favColor = favorite ? "action" : "secondary";
  const [groupInfo,setGroupInfo] = useState(props);
  const [startEvent,setStartEvent] = useState({});
  const [endEvent,setEndEvent] = useState({});
  const [dest,setDest] = useState('');
  const [ready,setReady] = useState(false);
  const [groupStatus,setGroupStatus] = useState(null);
  // var dest = '';

  const handleRequestClick = () => {
    if(!request){
      //POST call .then()
      props.handleRequestClick(props.groupId,props.groupName,props.creatorUser);
      setRequest(!request);
      return;
    }
    if(props.joinStatus){
      console.log("navigating to chat room");
      return;
    }
  }

  const addToFavorites = () => {
    console.log("favorites");
    //POST call .then()
    setFavorite(!favorite);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect( () => {
    let eventStart = getDateTime(new Date(groupInfo.event.start_time));
    let eventEnd = getDateTime(new Date(groupInfo.event.end_time));

    setStartEvent({date:eventStart.date, time: eventStart.time });
    setEndEvent({date:eventEnd.date, time: eventEnd.time });
    setGroupStatus(groupInfo.user_group_infos[0].user_group_status.status);
    console.log(JSON.stringify(groupInfo.user_group_infos))
    // setGroupStatus(groupInfo.)
    reverseGeocode(groupInfo.event.latitude,groupInfo.event.longitude)
      .then(resp => resp.address.suburb)
      .then(location => {
        setDest(location);
        setReady(true)
      });
  },[]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <ShowIfPropTrue prop={ready}>
      <Card className={classes.root} variant="outlined">
          <CardHeader
            action={


                groupStatus == "APPROVED" || groupStatus == "ADMIN" ?
                  <Link to={'/chatRoom/chat/' + groupInfo.group_name}>

                  <IconButton style={{zIndex:1}}
                                  aria-label="chat or join"
                                  onClick={handleRequestClick}
                    >
                      <ChatBubbleOutlineOutlinedIcon/>
                    </IconButton>
                  </Link>

                  :
                    (groupStatus == "PENDING" ?
                        <IconButton style={{zIndex:1}}
                                    aria-label="chat or join"
                                    onClick={handleRequestClick}
                        >
                      <CheckCircleOutlineIcon style={{ color: "#ff9900" }}/>
                        </IconButton>
                      :
                        <IconButton style={{zIndex:1}}
                                    aria-label="chat or join"
                                    onClick={handleRequestClick}
                        >
                      <GroupAddOutlinedIcon/>
                        </IconButton>
                    )

            }
            title={
              <Typography>
                {props.event.name}
              </Typography>
            }
            subheader={
              <Typography variant={'caption'}>
              {startEvent.time} | {startEvent.date}
              </Typography>
            }
            disableTypography={true}
          />
          <CardContent style={{paddingTop:'5px', paddingBottom:'5px'}}>

            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
              style={{fontSize:'smaller'}}
            >
              {
                groupInfo.event.event_type_id == 1 ?
                  <span>
                    {groupInfo.event.city.airport_id}
                    <LocalAirportIcon style={{fontSize:'0.8rem'}}/>

                  </span>
                :
                groupInfo.event.city.name
              }
                {bull}  {dest} {bull}   {groupInfo.event.max_participants}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions disableSpacing style={{paddingTop:'2px',paddingBottom:'5px'}}>
            <IconButton aria-label="add to favorites" style={{zIndex:1,paddingTop:2,paddingBottom:2}} onClick={addToFavorites}>
              <FavoriteIcon
                fontSize={'small'}
                color={favColor}

              />
            </IconButton>
            <IconButton aria-label="share" style={{zIndex:1,paddingTop:2,paddingBottom:2}}>
              <ShareIcon fontSize={'small'}/>
            </IconButton>
            <IconButton
              style={{zIndex:1,paddingTop:2,paddingBottom:2}}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon fontSize={'small'}/>
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                <IconButton aria-label="admin name">
                  <PersonIcon
                    color="primary"
                    fontSize="small"
                    style={{ marginRight: 10 }}
                  />
                    {props.creatorUser}
                </IconButton>
              </Typography>
              <Typography paragraph style={{fontSize:'smaller'}}>
                {groupInfo.event.description}
              </Typography>
            </CardContent>
          </Collapse>
    </Card>
      </ShowIfPropTrue>
    </Grid>
  );
}

export default EventCard;
