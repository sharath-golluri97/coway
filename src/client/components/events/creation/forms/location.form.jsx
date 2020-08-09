import React, { useContext } from "react";
//material-ui
import { Grid } from "@material-ui/core";
import Map from './map.molecule';

//context
import { EventContext } from "../eventContext.atom";

export default props => {
    const [state] = useContext(EventContext);
    const { user } = state;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Map
                    google={props.google}
                    center={{lat: user.location.lat, lng: user.location.long}}
                    stateContext={user}
                    height='300px'
                    zoom={12}
                />
            </Grid>
        </Grid>
    );
};
