import React, { useState, useEffect } from "react";
import AllEvents from "../events/selection/cards/allEventsList.component";
import { getUserInfo } from "../../../Authenticator/tokens";
import _ from "lodash";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Grid } from "@material-ui/core";
import EventSearchBar from "./eventsearch/searchBar.component";
import useStyles from "./homePage.style";
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";
import {getUserGroups} from "../../services/groups";


export default function HomePage() {
  const classes = useStyles();

  const [, setUserInfo] = useState({});
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
        return event.group_name === value.event.name
      });
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
    <div style={{height:'100%'}}>
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
      <Grid container spacing={1}>
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
