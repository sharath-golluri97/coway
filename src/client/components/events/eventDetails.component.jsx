import React, {useState,useEffect} from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import EventDetailsData from "./selection/mocks/getEventDetails";
import EventCard from "./selection/cards/eventCard.molecule";
import {getUserInfo} from "../../../Authenticator/tokens";
import {getGroupDetails,isUserInGroup} from "../../services/groups";
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "3px",
      paddingRight: "3px"
    }
  });

const EventDetails = (props) => {
    const groupId = props.match.params.id;
    console.log(groupId);
    const classes = useStyles();

    const [events, setEvents] = useState([{}]);
    const [ready,setReady] = useState(false);
    const [anonymous,setAnonymous] = useState(true);

    useEffect(()=>{
            var params = {};
            params['id']=groupId;
            console.log("params", params);
            getGroupDetails(params).then(resp => {
            console.log("events", resp);
            setEvents(resp);
            getUserInfo().then(userData => {
                var email = userData.email;
                var requestBody = {};
                requestBody['id']= groupId;
                requestBody['email']= email;
                console.log("requestBody", requestBody);
                isUserInGroup(requestBody).then(exists => {
                    if(exists) setAnonymous(false);
                    console.log("exists", exists);
                    setReady(true);
                });
            // setReady(true);
            });
        });
    },[]);

    return (
        <ShowIfPropTrue prop={ready}>
        <Grid
        container
        spacing={1}
        className={classes.gridContainer}
        justify="center"
        >
        {
        events.map( (eventDetails,i) => {
          return <EventCard {...eventDetails} key={i} anonymous={anonymous}/>
        })
      }
        </Grid>
        </ShowIfPropTrue>
    );
}

export default EventDetails;
