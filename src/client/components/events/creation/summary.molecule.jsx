import React, { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

//material-ui
import { Typography, Grid } from "@material-ui/core";

// context
import { EventContext } from "./eventContext.atom";

const useStyles = makeStyles(theme => ({
    summary: {
        padding: theme.spacing(3),
        border: "1px solid #ddd",
        marginBottom: theme.spacing(2)
    }
}));

export default props => {
    const classes = useStyles();
    const [state] = useContext(EventContext);
    const { eventname, startdate, city,cityname, maxparticipants, description, remarks, q1, q2, q3 } = state.user;
    return (
        <Fragment>
            <Grid container className={classes.summary}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Summary</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Event name</Typography>
                    <Typography variant='body2'>{eventname || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Start date</Typography>
                    <Typography variant='body2'>{startdate || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>City</Typography>
                    <Typography variant='body2'>{cityname || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>No. of participants</Typography>
                    <Typography variant='body2'>{maxparticipants || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Description</Typography>
                    <Typography variant='body2'>{description || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Remarks</Typography>
                    <Typography variant='body2'>{remarks || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5'> Questionnaire </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Question 1 </Typography>
                    <Typography variant='body2'>{q1 || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Question 2 </Typography>
                    <Typography variant='body2'>{q2 || "-"}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Question 3 </Typography>
                    <Typography variant='body2'>{q3 || "-"}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};
