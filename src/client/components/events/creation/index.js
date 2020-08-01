import React, { Fragment, useContext,useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//modules
import EventDetails from "./forms/eventDetails.form";
import LocationDetails from "./forms/location.form";
import Questionnaire from "./forms/questionnaire.form";
import EventFormSummary from "./summary.molecule";
import Success from "./success.atom";

//material-ui
import { Box, Typography, Snackbar, SnackbarContent } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
//stepper
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import {createEvent} from "../../../services/events"; 
import Button from "@material-ui/core/Button";
//context
import { EventContext } from "./eventContext.atom";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(8, 12)
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4, 6)
        }
    },
    center: {
        textAlign: "center"
    },
    content: {
        padding: theme.spacing(3, 0, 3, 5)
    },
    buttonsContainer: {
        margin: theme.spacing(7,0, 0)
    },
    button: {
        marginRight: theme.spacing(2)
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));


const steps = ["Event details", "Location details","Questionnaire", "Summary"];

//main form component
export default props => {
    const [completed, setCompleted] = React.useState(false);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [errors] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useContext(EventContext);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const isStepOptional = step => {
        return step === 1;
    };
    const handleCloseSnackbar = () => {
        setOpen(false);
    };


    const handleSubmit = e => {
        e.preventDefault();
        if (activeStep < steps.length - 1) handleNext();
        else {
            console.log('form data..', state);
                var events = {};
                var questionnaire = {};
                var groups={};
                events['name'] = state.user.eventname;
                events['description'] = state.user.description;
                events['city_id'] = state.user.city;
                events['event_type_id']= 1;
                events['remarks']= state.user.remarks;
                events['event_start_time']= state.user.startdate;
                events['latitude']= state.user.location.lat;
                events['longitude']= state.user.location.long;
                events['is_active']=true;

                questionnaire['question_1']= state.user.q1;
                questionnaire['question_2']= state.user.q2;
                questionnaire['question_3']= state.user.q3;
                questionnaire['required_questions']= [1];
                
                groups['creator_id']= state.user.user_id;
                groups['max_participants']= state.user.maxparticipants;
                
                var request = {};
                request['groups']= groups;
                request['questionnaire']=questionnaire;
                request['events']=events;

                console.log("request..", request);
                createEvent(request).then(resp => {
                    console.log("new event created: ", resp.id);
                    setCompleted(true);
                });
                
        }
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <EventDetails />;
            case 1 :
                return <LocationDetails/>;
            case 2:
                return <Questionnaire />;
            case 3:
                return <EventFormSummary />;
            default:
                return "Unknown step";
        }
    };

    const handleError = e => {
        errors[e.target.name] = e.target.validationMessage;
        setState({ ...state, errors: { ...errors } });
        setOpen(true);
    };

    const handleChange = e => {
        //PASSWORD MATCHING
        if (
            e.target.name === "confirmPassword" &&
            e.target.value !== state.user.password
        ) {
            e.target.setCustomValidity("Passwords are not matching");
        } else {
            e.target.setCustomValidity("");
        }
        if (e.target.name === "password") {
            const confirm = e.target.form.querySelector(
                "input[name='confirmPassword']"
            );
            // WHEN WE CHANGE PASSWORD, WE WANT TO VALIDATE CONFIRM PASSWORD AS WELL
            if (e.target.value === state.user.confirmPassword) {
                delete errors[confirm.name];
                confirm.setCustomValidity("");
            } else {
                confirm.setCustomValidity("Passwords are not matching");
                errors[confirm.name] = confirm.validationMessage;
            }
        }
        if (e.target.validity.valid) {
            //OTHER ELEMENTS
            delete errors[e.target.name];
        } else {
            errors[e.target.name] = e.target.validationMessage;
        }
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({
            ...state,
            user: { ...state.user, [e.target.name]: value },
            errors: { ...errors }
        });
    };

    return (
        <Fragment>
            {!completed && (
                <Box className={classes.root}>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {steps.map((label, index) => {
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant='caption'>group joining questions</Typography>
                                );
                            }

                            return (
                                <Step key={index}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                    <StepContent>
                                        <form
                                            onSubmit={handleSubmit}
                                            onInvalid={handleError}
                                            onChange={handleChange}
                                            className={classes.content}
                                        >
                                            {getStepContent(activeStep)}
                                            <div className={classes.buttonsContainer}>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    className={classes.button}
                                                    variant='contained'
                                                    onClick={handleBack}
                                                >
                                                    Back
                                                </Button>
                                                {activeStep < steps.length - 1 && (
                                                    <Button
                                                        type='submit'
                                                        className={classes.button}
                                                        variant='contained'
                                                        color='primary'
                                                    >
                                                        Next
                                                    </Button>
                                                )}
                                                {activeStep === steps.length - 1 && (
                                                    <Button
                                                        type='submit'
                                                        className={classes.button}
                                                        variant='contained'
                                                        color='primary'
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            )}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                resumeHideDuration={3000}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                open={open}
            >
                <SnackbarContent
                    className={(classes.error, classes.error)}
                    message={
                        <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
                            {"Please correct the data"}
            </span>
                    }
                />
            </Snackbar>
            {completed && (
                <Box className={(classes.root, classes.center)}>
                    <Success />
                </Box>
            )}
        </Fragment>
    );
};
