import React, { useState, useEffect } from "react";
import AllEvents from "../events/selection/cards/allEventsList.component";
import { getUserInfo } from "../../../Authenticator/tokens";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EventSearchBar from "./eventsearch/searchBar.component";
import useStyles from "./homePage.style";
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import {getUserGroups} from "../../services/groups";

const signalR = require("@aspnet/signalr");

// import displayUserInformation from "../../../Authenticator/UserInfo";
export default function HomePage(props) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({});
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState([{}]);
  const [filteredEvents, setFilteredEvents]  = useState([{}]);
  const [value, setValue] = React.useState(null);

  useEffect(()=>{
    getUserInfo().then(userData => {
      setUserInfo(userData);
      var params = {};
      params['email']=userData.email;
      console.log("params", params);
      getUserGroups(params).then(resp => {
        setFilteredEvents(resp);
        setEvents(resp);
        setReady(true);
      });
    })
  },[]);

  useEffect(()=>{
    if(value && value.event ) {
      console.log(JSON.stringify(events))
      const filterResult = events.filter(event => {
        console.log("eg: " + event.group_name +  " ve: " + value.event.name);
        return event.group_name === value.event.name
      });
      console.log(JSON.stringify(filterResult))
      setFilteredEvents(filterResult)


    }
    else {
      setFilteredEvents(events)
    }
  },[value])


  const handleSearchSelect = (event, newValue) => {
    // Create a new value from the user input
    if (newValue && newValue.inputValue) {
      setValue({
        title: newValue.inputValue,
      });
      return;
    }
    setValue(newValue);
  }

  return (
    <div>
      <ShowIfPropTrue prop={ready}>
      <Grid container spacing={1}>
       {/* <Grid item xs={12}>
          <Typography variant={"h6"}>Welcome</Typography>
        </Grid>*/}
          <Grid item container xs={12} className={classes.searchBar}>
            <Grid item xs={12}>
              <EventSearchBar value={value} onChange={handleSearchSelect} events={events} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.eventList}>
            <AllEvents events={filteredEvents}/>
          </Grid>
        </Grid>
      </ShowIfPropTrue>
    </div>
  );
}
