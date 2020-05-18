import React, {useState,useEffect} from 'react';
import EventsList from "../events/selection/cards/eventsList.component";


export default function HomePage(props) {

    return (
        <div>
            <p>Welcome</p>
          {/*{displayUserInformation()}*/}
            <br></br>
            <EventsList/>
        </div>
    )
}
