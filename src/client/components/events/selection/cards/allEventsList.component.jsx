import React, {useState} from "react";
import { Grid,Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventCard from "./eventCard.molecule";
import ShowIfPropTrue from "../../../../commons/showPropIf/showPropIf";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "3px",
    paddingRight: "3px"
  }
});

const EventsList = (props) => {

  const classes = useStyles();
  const [ready] = useState(true);

  return (
    <ShowIfPropTrue prop={ready}>
    <Grid
      container
      spacing={1}
      className={classes.gridContainer}
      justify="center"
    >
    <ShowIfPropTrue prop={props.events.length==0}>
    <Typography variant={"h5"}>
      You don't have group subscriptions yet.
      Please search and join groups or create new one.
    </Typography>
    </ShowIfPropTrue>
      {
        props.events.map( (eventDetails,key) => {
          return <EventCard {...eventDetails} key={key} {...props}  anonymous={false} questionnaire={{}}/>
        })
      }

    </Grid>
    </ShowIfPropTrue>
  );
}

export default EventsList;
