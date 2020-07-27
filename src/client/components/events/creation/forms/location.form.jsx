import React, { useContext } from "react";
//material-ui
import { TextField, Grid } from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Map from './map.molecule';

//context
import { EventContext } from "../eventContext.atom";

export default props => {
    const [state] = useContext(EventContext);
    const { user, errors } = state;
    const cities = [
        {title: "Bengaluru"},
        {title: "Hyderabad"},
        {title: "Delhi"},
        {title: "Mumbai"}
    ];
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Map
                    google={props.google}
                    center={{lat: user.location.lat, lng: user.location.long}}
                    height='300px'
                    zoom={15}
                />
            </Grid>
        </Grid>
    );
};
