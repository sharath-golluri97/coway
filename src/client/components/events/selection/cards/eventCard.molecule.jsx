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



const EventCard = (props) => {
  const classes = EventCardStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [expanded, setExpanded] = useState(false);
  const [request, setRequest] = useState(props.requestStatus);
  const [favorite, setFavorite] = useState(props.favoriteEvent);
  const favColor = favorite ? "action" : "secondary";

  const handleRequestClick = () => {
    if(!request){
      //POST call .then()
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

  });

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.root} variant="outlined">
          <CardHeader
            action={
              <IconButton
                aria-label="chat or join"
                onClick={handleRequestClick}
              >
                {props.joinStatus? <ChatBubbleOutlineOutlinedIcon/> : (request ? <CheckCircleOutlineIcon style={{ color: "#ff9900" }}/> : <GroupAddOutlinedIcon/> )}
              </IconButton>
            }
            title={props.eventName}
            subheader={props.eventTime}
          />
          <CardContent>
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
            >
              {props.pickUpLocation}  {bull}  {props.dropLocation} {bull}   {props.maxPeople}
            </Typography>
            <Divider />
            <Typography className={classes.pos} color="textSecondary">
              <IconButton aria-label="time">
                <AccessTimeOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: 10 }}
                />
                {props.eventTime} {props.timeZone}
              </IconButton>
            </Typography>
            <Typography variant="body2" component="p">
              {props.shortDesc}
              <br />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                color={favColor}
                onClick={addToFavorites}
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                <IconButton aria-label="admin name">
                  <PersonIcon
                    color="primary"
                    fontSize="large"
                    style={{ marginRight: 10 }}
                  />
                    {props.creatorUser}
                </IconButton>
              </Typography>
              <Typography paragraph>
                {props.longDesc}
              </Typography>
            </CardContent>
          </Collapse>
    </Card>
    </Grid>
  );
}

export default EventCard;
