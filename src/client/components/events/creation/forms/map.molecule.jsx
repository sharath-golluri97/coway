import React, { Component , useContext} from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import {Grid} from "@material-ui/core";
import { EventContext } from "../eventContext.atom";

Geocode.setApiKey( 'AIzaSyCv7mHnjHZYsbeOe9tRMqWcKDZ9ywXSmI0' );
Geocode.enableDebug();

class Map extends Component{

    constructor( props ){
        super( props );
        this.state = {
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }

    /**
     * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate( nextProps, nextState ){
        if (
            this.state.markerPosition.lat !== this.props.center.lat
        ) {
            return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
            return false
        }
    }
    /**
     * And function for city,state and address input
     * @param event
     */
    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = ( event ) => {

    };

    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = ( event ) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        this.props.onLocationChange(newLat, newLng);
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                this.setState( {
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                } )
            },
            error => {
                console.error(error);
            }
        );
    };

    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = ( place ) => {
        console.log( 'plc', place );
        const latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.props.onLocationChange(latValue, lngValue);
        this.setState({
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };


    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={ this.props.google }
                               defaultZoom={ this.props.zoom }
                               defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        <Marker google={this.props.google}
                                name={'Dolores park'}
                                draggable={true}
                                onDragEnd={ this.onMarkerDragEnd }
                                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '500px'
                            }}
                            onPlaceSelected={ this.onPlaceSelected }
                            types={['(regions)']}
                        />
                    </GoogleMap>
                )
            )
        );
        let map;
        if( this.props.center.lat !== undefined ) {
          map = <Grid container spacing={2}>
            <Grid item xs={12}>
              <AsyncMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCv7mHnjHZYsbeOe9tRMqWcKDZ9ywXSmI0&libraries=places`}
                loadingElement={
                  <div style={{ height: `100%` }} />
                }
                containerElement={
                  <div style={{ height: this.props.height }} />
                }
                mapElement={
                  <div style={{ height: `100%` }} />
                }
              />
            </Grid>
          </Grid>
        } else {
            map = <div style={{height: this.props.height}} />
        }
        return( map )
    }
}
export default Map
