import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EventData from "../mocks/getEvents"
import EventCard from "./eventCard.molecule";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

export default function EventsList() {
  const data = EventData.eventList;
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      {
        data.map( (eventDetails) => {
          return <EventCard {...eventDetails} key={eventDetails.eventId}/>
        })
      }
    </Grid>
  );
}
