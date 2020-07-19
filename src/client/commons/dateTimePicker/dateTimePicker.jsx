import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" spacing={1}>
        <Grid item xs={7}>
        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Event Date"
          format="dd/MM/yyyy"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        <Grid item xs={5}>
        <KeyboardTimePicker
          id="time-picker"
          label="Event Time"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
