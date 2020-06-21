import React, { useState } from 'react';
import { InstantSearch, connectSearchBox } from 'react-instantsearch-dom'
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import PropTypes from 'prop-types'
import Autocomplete from './autoComplete.component';
import Geo from './geo.molecule'
import './maps.css'


const VirtualSB = connectSearchBox(() => <span />);
  
const MapsView = () =>  {
    const[query, setQuery] = useState('');

    const onSuggestionSelected = (_, { suggestion }) => {
        setQuery(suggestion.value);
};
   
    const onSuggestionCleared = () => {
        setQuery('');
     };
        return (
            <InstantSearch
                appId="P5J7LV85BK"
                apiKey="53bb626187096f4bd90c3f82e2b6a032"
                indexName="events_data"
            >
                <main>
                    <div id="searchbox">
                    <Autocomplete
                    onSuggestionSelected={onSuggestionSelected}
                    onSuggestionCleared={onSuggestionCleared}
                    />
                    <VirtualSB />
                    </div>
                    <div >
                        <div id="map">
                            <div style={{height:"80vh"}}>
                                <GoogleMapsLoader apiKey="AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ">
                                    {google => <Geo google={google} />}
                                </GoogleMapsLoader>
                            </div>
                        </div>
                    </div>
                </main>
            </InstantSearch>
        );
}

export default MapsView;
