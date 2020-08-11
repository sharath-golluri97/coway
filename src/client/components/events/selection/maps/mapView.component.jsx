import React, {useState,useEffect } from 'react'
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
import ShowIfPropTrue from "../../../../commons/showPropIf/showPropIf";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MapsView = () =>  {

        const [selectedDate, setSelectedDate] = React.useState(new Date());
        const [inputValue, setInputValue] = React.useState('');
        const [cities, setCities] = useState([{}]);
        const [cityOptions, setCityOptions]= useState([]);
        const [value, setValue] = React.useState(cityOptions[0]);
        const [ready,setReady] = useState(false);

        function getCityId(cityName){
          for(var i in cities){
            if(cities[i].name==cityName){
              if(cities[i].id == undefined){
                console.log("entered undefied")
                return 1;
              }
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
              setReady(true);

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
          <div style={{height:'100%'}}>
          <ShowIfPropTrue prop={!ready}>
            <Grid container item direction='column' alignItems='center' justify='center' style={{height:'100%'}}>
              <Loader
                type="Circles"
                color="#00BFFF"
                height={40}
                width={40}
              />
            </Grid>
          </ShowIfPropTrue>
            <ShowIfPropTrue prop={ready}>
            <InstantSearch
                indexName="events_data"
                searchClient={searchClient}
            >
                <Configure
                    hitsPerPage={100}
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
            </ShowIfPropTrue>
          </div>
        );
}
export default MapsView;
