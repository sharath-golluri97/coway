import React, { useContext } from "react";
import { EventContext } from "../eventContext.atom";

//material-ui
import { TextField, Grid } from "@material-ui/core";

export default props => {
    const [state] = useContext(EventContext);
    const { user } = state;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id='q1'
                    label='Question 1'
                    value={user.q1}
                    name='q1'
                    placeholder='Answer this question'
                    variant='outlined'
                    margin='normal'
                    multiline
                    required
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        maxLength: 200
                    }}
                    fullWidth
                    rows={3}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='q2'
                    label='Question 2'
                    value={user.q2}
                    name='q2'
                    placeholder='Answer this question'
                    variant='outlined'
                    margin='normal'
                    multiline
                    required
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        maxLength: 200
                    }}
                    fullWidth
                    rows={3}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='q3'
                    label='Question 3'
                    value={user.q3}
                    name='q3'
                    placeholder='Answer this question'
                    variant='outlined'
                    margin='normal'
                    multiline
                    required
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        maxLength: 200
                    }}
                    fullWidth
                    rows={3}
                />
            </Grid>
        </Grid>
    );
};
