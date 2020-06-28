import React from 'react'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom'
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import algoliasearch from 'algoliasearch/lite';
import Geo from './geo.molecule'
import './maps.css'

const searchClient = algoliasearch(
  'P5J7LV85BK',
  '53bb626187096f4bd90c3f82e2b6a032'
);


const MapsView = () =>  {
        return (
            <InstantSearch
                appId="P5J7LV85BK"
                apiKey="53bb626187096f4bd90c3f82e2b6a032"
                indexName="events_data"
            >
                <Configure
                    hitsPerPage={6}
                    getRankingInfo
                    aroundLatLngViaIP
                    typoTolerance="min"
                />
                <main>
                    <div id="searchbox">
                        {/*Auto-complete part goes here*/}
                        <SearchBox
                            translations={{
                                placeholder: 'Search events...'
                            }}
                        />
                    </div>
                    <div >
                        <div id="map">
                            <div style={{height:"50vh"}}>
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
