import React, {useState,useContext,useEffect } from 'react'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite';
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import Geo from './geo.molecule'
import Stats from './stats.molecule'
import './maps.css'
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from "../../../../commons/dateTimePicker/dateTimePicker";
import CitySelect from "../citySelect/citySelect.component";
import {getCities} from "../../../../services/cities";
// const options = ['Bengaluru', 'Option 2'];

const MapsView = () =>  {

        const [selectedDate, setSelectedDate] = React.useState(new Date());
        const [inputValue, setInputValue] = React.useState('');
        const [cities, setCities] = useState([{}]);
        const [cityOptions, setCityOptions]= useState([]);
        const [value, setValue] = React.useState(cityOptions[0]);


        function getCityId(cityName){
          for(var i in cities){
            if(cities[i].name==cityName){
              console.log(cities[i].id);
              return cities[i].id;
            }
          }
        }

        useEffect(()=>{
          getCities().then(cityRes => {
              setCities(cityRes);
              var cityMap = [];
              console.log(cities);
              for(var i in cityRes){
                cityMap.push(cityRes[i].name);
                console.log(cityRes[i].name);
              }
              setCityOptions(cityMap);
        });
        },[]);

        const handleOnCityChange = (event, newValue) => {
          console.log("city changed:", newValue);
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
                    filters={`city_id:${getCityId(value)} AND end_time > ${selectedDate.getTime()}`}
                />
                <main>
                  <Grid container justify="center" alignItems="center" >
                    <Grid item xs={12} style={{marginTop:'10px'}}>
                      <CitySelect options={cityOptions} handleOnChange={handleOnCityChange} value={value} inputValue={inputValue} onInputChange={handleOnCityInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <MaterialUIPickers selectedDate={selectedDate} handleDateChange={handleDateChange}/>
                    </Grid>
                    <Grid item xs={12}>
                    <div id="searchbox">
                        <SearchBox
                          searchAsYouType={false}
                            translations={{
                                placeholder: 'Search events by name, description..'
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
                                <GoogleMapsLoader apiKey="AIzaSyCv7mHnjHZYsbeOe9tRMqWcKDZ9ywXSmI0">
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
