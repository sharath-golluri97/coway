import React, {useState,useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export default function UserInfoForm(props) {




    return (
        <form  noValidate autoComplete="off">
            <Grid container  spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={props.userInfo.name}
                        onChange={props.handleUserInfoChange('name')}
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-number"
                        label="user id"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.userInfo.id}
                        onChange={props.handleUserInfoChange('id')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={props.groupInfo.name}
                        onChange={props.handleGroupInfoChange('name')}
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleUserInfoSubmit}>
                Submit
            </Button>
        </form>
    )
}

