import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EventData from "../mocks/getEvents"
import EventCard from "./eventCard.molecule";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "3px",
    paddingRight: "3px"
  }
});

export default function EventsList(props) {
  const data = EventData.groups;
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={1}
      className={classes.gridContainer}
      justify="center"
    >
      {
        data.map( (eventDetails) => {
          return <EventCard {...eventDetails} key={eventDetails.id} {...props}/>
        })
      }
    </Grid>
  );
}
