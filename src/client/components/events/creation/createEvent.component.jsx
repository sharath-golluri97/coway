import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
//create form
import CreateForm from "./index";
//headers
import Typography from "@material-ui/core/Typography";
//context
import UserContextProvider from "./eventContext.atom";

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down("sm")]: {
            flexGrow: 1
        }
    },
    title: {
        color: theme.palette.primary.contrastText,
        marginBottom: theme.spacing(1)
    },
    subtitle: {
        color: theme.palette.primary.light
    },
    toolbar: {
        justifyContent: "center"
    }
}));

const CreateEvent = () => {
    const classes = useStyles();
    return (
        <UserContextProvider>
            <Grid container className={classes.root}>
                <Grid item className={classes.header} xs={12} md={4}>
                    <Typography variant='h3' className={classes.title}>
                        Want a new event?
                    </Typography>
                    <Typography variant='h5' className={classes.subtitle}>
                        Complete these 3 easy steps, and it's done!
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <CreateForm />
                </Grid>
            </Grid>
        </UserContextProvider>
    );
}

export default CreateEvent;
