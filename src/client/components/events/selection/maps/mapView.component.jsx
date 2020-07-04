import React from 'react'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite';
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import Geo from './geo.molecule'
import Stats from './stats.molecule'
import './maps.css'
const MapsView = () =>  {

const searchClient = algoliasearch(
'P5J7LV85BK',
'53bb626187096f4bd90c3f82e2b6a032'
);
        return (
            <InstantSearch
                indexName="events_data"
                searchClient={searchClient}
            >
                <Configure
                    hitsPerPage={6}
                    getRankingInfo
                    aroundLatLngViaIP
                    typoTolerance="min"
                />
                <main>
                    <div id="searchbox">
                        <SearchBox
                            translations={{
                                placeholder: 'Search events by name, city...'
                            }}
                        />
                    </div>
                    <div id="stats">
                        <Stats />
                    </div>
                    <div >
                        <div id="map">
                            <div style={{height:"75vh"}}>
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
