import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function CitySelect(props) {

  return (
    <div>
      <Autocomplete
        value={props.value}
        onChange={props.handleOnChange}
        inputValue={props.inputValue}
        onInputChange={props.onInputChange}
        id="controllable-states-demo"
        options={props.options}
        renderInput={(params) => <TextField {...params} label="City" variant="outlined"  />}
      />
    </div>
  );
}
