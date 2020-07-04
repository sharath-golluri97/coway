
import React from 'react';
// import EventCard from "../events/selection/cards/eventCard.molecule";
import AllEvents from "../events/selection/cards/allEventsList.component";
import CreatedEvents from "../events/selection/carousel/createdEvents.component";
import JoinedEvents from "../events/selection/carousel/joinedEvents.component"
// import displayUserInformation from "../../../Authenticator/UserInfo";
export default function HomePage(props) {

    return (
        <div>
            <p>Welcome</p>
          {/*{displayUserInformation()}*/}
            <br></br>
            <h2> Events you've created</h2>
            <CreatedEvents/>
            <h2> Events you're part of</h2>
            <JoinedEvents/>
            <h2> Events you might be interested</h2>
            <AllEvents/>
        </div>
    )
};
