import React, {useState,useContext,useEffect } from "react";
//material-ui
import { TextField, Grid,MenuItem} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShowIfPropTrue from '../../../../commons/showPropIf/showPropIf';
//context
import { EventContext } from "../eventContext.atom";
import {getCities} from "../../../../services/cities";
import {getUserInfo} from "../../../../../Authenticator/tokens";

export default props => {
    const [state] = useContext(EventContext);
    const { user, errors } = state;
    const [cities, setCities] = useState([{}]);
    const [city, setCity] = React.useState(1);
    const [ready,setReady] = useState(false);

    useEffect(()=>{
        getCities().then(cityRes => {
            setCities(cityRes);
            getUserInfo().then(userData => {
                user.user_id = userData['userId'];
                setReady(true);
            });
        });
    },[]);

    const handleCityChange = (event) => {
        user.city = event.target.value;
        setCity(event.target.value);
      };

    return (
        <ShowIfPropTrue prop={ready}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Type your event name here'
                    name='eventname'
                    label='Event name'
                    value={user.eventname}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    inputProps={{
                        minLength: 3,
                        maxLength: 20
                    }}
                    error={!!errors["eventname"]}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='description'
                    placeholder='Elaborate details'
                    name='description'
                    label='Description'
                    value={user.description}
                    variant='outlined'
                    margin='normal'
                    multiline
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                    inputProps={{
                        minLength: 3,
                        maxLength: 200
                    }}
                    error={!!errors["description"]}
                    fullWidth
                    rows={3}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    type='datetime-local'
                    name='startdate'
                    id='startdate'
                    label='Start date'
                    defaultValue={user.startdate}
                    variant='outlined'
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        min: new Date().toISOString().slice(0, 16),
                        max: "2100-01-01"
                    }}
                    error={!!errors["startdate"]}
                    required
                    fullWidth={isWidthDown("sm")}
                />
            </Grid>
            <Grid item sm={4} md={6} xs={12}>
            <TextField
                id="city"
                select
                label="Select City"
                value={city}
                onChange={handleCityChange}
                helperText="Select your city"
                >
                {cities.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
                {/* <Autocomplete
                    id="city"
                    autoComplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => {
                        if (option.name === value.title)
                        {
                            user.city = value.title
                        }
                        return option.name === value.title;
                    }
                    }
                    style={{ width: 300 }}
                    renderInput={
                        (params) => <TextField
                            {...params}
                            label="City"
                            placeholder='Choose airport city'
                            variant="outlined"
                            name='city'
                            value={user.city}
                            margin='normal'
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    }
                /> */}
            </Grid>
            <Grid item sm={4} md={6} xs={12}>
                <TextField
                    id="maxparticipants"
                    label="No of Participants"
                    name="maxparticipants"
                    type="number"
                    value={user.maxparticipants}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    InputProps={{
                        inputProps: {
                            max: 5, min: 2
                        }
                    }}
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*    <TextField*/}
            {/*        id='shortdescription'*/}
            {/*        placeholder='TL;DR'*/}
            {/*        name='shortdescription'*/}
            {/*        label='Short Description'*/}
            {/*        value={user.shortdescription}*/}
            {/*        variant='outlined'*/}
            {/*        margin='normal'*/}
            {/*        InputLabelProps={{*/}
            {/*            shrink: true*/}
            {/*        }}*/}
            {/*        required*/}
            {/*        inputProps={{*/}
            {/*            minLength: 3,*/}
            {/*            maxLength: 100*/}
            {/*        }}*/}
            {/*        error={!!errors["shortdescription"]}*/}
            {/*        fullWidth*/}
            {/*        rows={3}*/}
            {/*    />*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
                <TextField
                    id='remarks'
                    placeholder='specific details or warnings'
                    name='remarks'
                    label='Remarks'
                    value={user.remarks}
                    variant='outlined'
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        minLength: 3,
                        maxLength: 100
                    }}
                    error={!!errors["remarks"]}
                    fullWidth
                    rows={3}
                />
            </Grid>
        </Grid>
        </ShowIfPropTrue>
    );
};
