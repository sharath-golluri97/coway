import React, {useState, useEffect} from "react";
import { Grid,Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getUserInfo} from "../../../../../Authenticator/tokens";
// import EventData from "../mocks/getEvents"
import {getUserGroups} from "../../../../services/groups";
import EventCard from "./eventCard.molecule";
import ShowIfPropTrue from "../../../../commons/showPropIf/showPropIf";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "3px",
    paddingRight: "3px"
  }
});

const EventsList = (props) => {
  // const data = EventData.groups;
  const classes = useStyles();
  const [events, setEvents] = useState([{}]);
  const [userInfo,setUserInfo] = useState({});
  const [ready,setReady] = useState(false);

  useEffect(()=>{
    getUserInfo().then(userData => {
        setUserInfo(userData);
        var params = {};
        params['email']=userData.email;
        console.log("params", params);
        getUserGroups(params).then(resp => {
          console.log("events", resp);
          setEvents(resp);
          setReady(true);
        });
    })
  },[]);


  return (
    <ShowIfPropTrue prop={ready}>
    <Grid
      container
      spacing={1}
      className={classes.gridContainer}
      justify="center"
    > 
    <ShowIfPropTrue prop={events.length==0}>
    <Typography variant={"h5"}>
      You don't have group subscriptions yet. 
      Please search and join groups or create new one.
    </Typography>
    </ShowIfPropTrue>
      {
        events.map( (eventDetails) => {
          return <EventCard {...eventDetails} key={eventDetails.id} {...props} anonymous={false} questionnaire={{}}/>
        })
      }

    </Grid>
    </ShowIfPropTrue>
  );
}

export default EventsList;
