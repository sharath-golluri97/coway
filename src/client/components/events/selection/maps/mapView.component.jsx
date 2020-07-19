import React from 'react'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite';
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import Geo from './geo.molecule'
import Stats from './stats.molecule'
import './maps.css'
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from "../../../../commons/dateTimePicker/dateTimePicker";
import CitySelect from "../citySelect/citySelect.component";

const options = ['Bengaluru', 'Option 2'];

const MapsView = () =>  {

        const [selectedDate, setSelectedDate] = React.useState(new Date());
        const [value, setValue] = React.useState(options[0]);
        const [inputValue, setInputValue] = React.useState('');

        const handleOnCityChange = (event, newValue) => {
          setValue(newValue);
        }

        const handleOnCityInputChange =(event, newInputValue) => {
          setInputValue(newInputValue);
        }

        const handleDateChange = (date) => {
          setSelectedDate(date);
        };

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
                    filters={`city_id:1 AND end_time > ${selectedDate.getTime()}`}
                />
                <main>
                  <Grid container justify="center" alignItems="center" >
                    <Grid item xs={12} style={{marginTop:'10px'}}>
                      <CitySelect options={options} handleOnChange={handleOnCityChange} value={value} inputValue={inputValue} onInputChange={handleOnCityInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <MaterialUIPickers selectedDate={selectedDate} handleDateChange={handleDateChange}/>
                    </Grid>
                    <Grid item xs={12}>
                    <div id="searchbox">
                        <SearchBox
                          searchAsYouType={false}
                            translations={{
                                placeholder: 'Search events by name, city...'
                            }}
                        />
                    </div>
                    </Grid>
                  </Grid>
                    <div id="stats">
                        <Stats />
                    </div>
                    <div >
                        <div id="map">
                            <div style={{height:"60vh"}}>
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
