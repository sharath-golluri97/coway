import React from 'react';
import { GeoSearch, Marker } from 'react-instantsearch-dom-maps';

const Geo = (props) =>  {
    const InfoWindow = new props.google.maps.InfoWindow();

    const onClickMarker = ({ hit, marker }) => {
        if (InfoWindow.getMap())
            InfoWindow.close();

        InfoWindow.setContent(
            '<div>' +
            '<span>' + '•' + '</span>' + hit.name + '<br>' +
            '<span>' + '•' + '</span>' + hit.created_on + '<br>' +
            '<span>' + '•' + '</span>' + hit.max_participants + '<br>' +
            '</div>' +
            ' <div> ' +
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
            '<a href="https://www.w3schools.com/html/" target="_blank">' +
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
            enableRefine={true}
            streetViewControl={false}
            mapTypeControl={true}
            zoom={4}
            minZoom={6.5}
            maxZoom={70}
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
