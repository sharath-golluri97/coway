import React, { Fragment } from "react";
import { Typography, Button,Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        border: "1px solid #ddd",
        marginBottom: theme.spacing(2),
        textAlign: "center"
    },
    title: {
        padding: theme.spacing(5, 0)
    }
}));

export default (props) => {
    const classes = useStyles();
    const reload = () => {
        window.location.reload();
    };
    const preventDefault = (event) => event.preventDefault();
    const event_link = "/events/" + props.event_id;
    return (
        <Fragment>
            <Typography variant='h4' className={classes.title}>
                Voila! your event has been created.
            </Typography>
            <Button variant='contained' color='primary' onClick={reload}>
            <Link href={event_link} onClick={preventDefault}>
                <Typography variant='h5' className={classes.title}>
                    Go to your Event Page
                </Typography>
            </Link> 
            </Button>
        </Fragment>
    );
};
