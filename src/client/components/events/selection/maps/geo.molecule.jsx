import React, { useState } from "react";
import { GeoSearch, Marker } from 'react-instantsearch-dom-maps';
import { makeStyles } from '@material-ui/core/styles';
import { renderToString } from 'react-dom/server'
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function formatDate(long_time) {
//todo : find better way
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

  var d = new Date(long_time),
      month = '' + (month[d.getMonth()]),
      day = '' + d.getDate(),
      hour = '' + d.getHours();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  if(hour.length < 2)
      hour = '0' + hour;

  return [day + ' ' + month +',' + hour + ' hours' ];
}



const Geo = (props) =>  {
    const InfoWindow = new props.google.maps.InfoWindow({content: ""});
    const [] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
      });
    const onClickMarker = ({ hit, marker }) => {
        if (InfoWindow.getMap())
            InfoWindow.close();

        InfoWindow.setContent(renderToString(
          <Grid container >
            <Grid item xs={12}>
              <Typography variant={'h6'} noWrap>
              {hit.name}
              </Typography>
              <Divider/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='overline'>
              {hit.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='overline' noWrap>
              {hit.remarks}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption' noWrap>
              {formatDate(hit.start_time)}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Link href={`#/events/${hit.event_id}`} >
              <Button style={{background: 'aquamarine',fontSize:'0.675rem', marginTop:2}}>
                More Details
              </Button>
              </Link>
            </Grid>
          </Grid>
        ));

        InfoWindow.open(marker.getMap(), marker);
    }

    const { google } = props;

    return (
                 <GeoSearch
                    google={google}
                    enableRefine={false}
                    streetViewControl={false}
                    mapTypeControl={false}
                    initialPosition={{
                        lat: 12.9716,
                        lng: 77.5946
                      }}
                    zoom={5}
                    minZoom={12}
                    maxZoom={20}
                    styles={[
                      {
                        stylers: [
                          {
                            hue: '#3596D2'
                          }
                        ]
                      }
                    ]}
                  >
                  {({ hits }) => (
                      <div>
                        {hits.map(hit => (
                          <Marker
                            key={hit.objectID}
                            hit={hit}
                            onClick={({ marker }) => {
                              onClickMarker({
                                hit,
                                marker
                              })
                            }}
                          />
                        ))}
                      </div>
                    )}

                  </GeoSearch>
    );
}
export default Geo;
