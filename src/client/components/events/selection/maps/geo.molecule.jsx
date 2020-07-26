import React, { Component, useState } from "react";
import { render } from "react-dom";
// import "react-sliding-pane/dist/react-sliding-pane.css";
import { GeoSearch, Marker } from 'react-instantsearch-dom-maps';
import ReactDOMServer from "react-dom/server";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


const Geo = (props) =>  {
    const InfoWindow = new props.google.maps.InfoWindow({content: ""});
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
      });
    const onClickMarker = ({ hit, marker }) => {
        if (InfoWindow.getMap())
            InfoWindow.close();

        InfoWindow.setContent(
            '<div>' +
            '<span>' + '•' + '</span><u>' + hit.name + '</u><br>' +
            '<span>' + '</span>' + hit.description + '<br>' +
            '<span>' + '</span><b>' + formatDate(hit.start_time) + '</b><br>' +
            '<span>' + '</span>' + hit.remarks + '<br>' +
            '</div>' +
            '<div> ' +
            '<style>' +
            '.button {' +
            '  background-color: #008CBA;' +
            '  border: none;' +
            '  color: white;' +
            '  padding: 2px 4px;' +
            '  text-align: center;' +
            '  text-decoration: none;' +
            '  display: inline-block;' +
            '  font-size: 12px;' +
            '  margin: 4px 2px;' +
            '  transition-duration: 0.4s;' +
            '  cursor: pointer;' +
            '  border-radius: 12px;' +
            '}' +
            '' +
            '.button2 {' +
            '  background-color: white; ' +
            '  color: black; ' +
            '  border: 2px solid #008CBA;' +
            '  border-radius: 12px;' +
            '}' +
            '' +
            '.button2:hover {' +
            '  background-color: #008CBA;' +
            '  color: white;' +
            '  border-radius: 12px;' +
            '}' +
            '</style>'+
            '<a href="http://localhost:3000/events/' + hit.event_id + '">' +
            '<button class="button button2">More details</button>' +
            '</a> ' +
            '</div>'
        );

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
