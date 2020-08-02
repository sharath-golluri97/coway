/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import EventData from "../../events/selection/mocks/getEvents"
import _ from 'lodash';
const filter = createFilterOptions();

export default function EventSearchBar(props) {
  // const [value, setValue] = React.useState(null);

  const eventList = props.events.map(group => {
    return { ..._.omit(group, ['group_name']), 'title': group.group_name};
  });

  return (
    <Autocomplete
      size={'small'}
      value={props.value}
      onChange={props.onChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        // if (params.inputValue !== '') {
        //   filtered.push({
        //     inputValue: params.inputValue,
        //     title: `Add "${params.inputValue}"`,
        //   });
        // }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      // handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={eventList}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search Events" variant="outlined" />
      )}
    />
  );
}

