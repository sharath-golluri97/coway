import React from 'react';
// import EventCard from "../events/selection/cards/eventCard.molecule";
import EventsList from "../events/selection/cards/eventsList.component";
// import displayUserInformation from "../../../Authenticator/UserInfo";
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
