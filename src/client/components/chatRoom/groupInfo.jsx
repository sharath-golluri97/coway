import React, {useState,useEffect} from 'react';
import {Grid,Typography} from '@material-ui/core';
import useStyles from "./chatApp.styles";
import SpeedDials from "./speedDial";
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const GroupInfo = (props) =>{
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [groupName,setGroupName] = useState("Test Group")

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return(
        <div style={{paddingTop:'24px'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        {groupName}
                    </Typography>
                </Grid>
                <Grid container  item spacing={3} className={classes.contentContainer}>
                    <Grid container item xs={12} alignContent="center">
                        <Grid item xs={4} style={{maxWidth:'fit-content', marginRight:'5px'}}>
                            <Typography variant='overline'>
                                <b>
                                Created By:
                                </b>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant='overline'>
                                Aman Gupta
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} alignContent="center">
                        <Grid item xs={1}>
                            <LocationOnIcon/>
                        </Grid>
                        <Grid item xs={10} style={{marginLeft:'5px'}}>
                            JCR Layout
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} alignContent="center">
                        <Grid item xs={1}>
                            <EventIcon/>
                        </Grid>
                        <Grid item xs={10} style={{marginLeft:'5px'}}>
                            25th March
                        </Grid>
                        {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                        {/*    <Grid container justify="space-around">*/}
                        {/*        <KeyboardDatePicker*/}
                        {/*            disableToolbar*/}
                        {/*            variant="inline"*/}
                        {/*            format="MM/dd/yyyy"*/}
                        {/*            margin="normal"*/}
                        {/*            id="date-picker-inline"*/}
                        {/*            label="Date picker inline"*/}
                        {/*            value={selectedDate}*/}
                        {/*            onChange={handleDateChange}*/}
                        {/*            KeyboardButtonProps={{*/}
                        {/*                'aria-label': 'change date',*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*</MuiPickersUtilsProvider>*/}
                    </Grid>
                    <Grid container item xs={12} alignContent="center">
                        <Grid item xs={1}>
                            <ScheduleIcon/>
                        </Grid>
                        <Grid item xs={10} style={{marginLeft:'5px'}}>
                            4:00 PM
                        </Grid>
                    </Grid>
                </Grid>
                <SpeedDials groupName={groupName}/>
            </Grid>
        </div>
    )
}

export default GroupInfo;
