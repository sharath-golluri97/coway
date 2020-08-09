import React, { Fragment } from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        border: "1px solid #ddd",
        marginBottom: theme.spacing(1),
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "2px"
    },
    title: {
        padding: theme.spacing(5, 0)
    }
}));

export default () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Typography variant='h4' className={classes.title}>
                Voila! your event has been created.
            </Typography>
            <Typography className={classes.root}>
                <Link href="/">
                    Return to Home Page
                </Link>
            </Typography>
        </Fragment>
    );
};
