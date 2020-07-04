import React from 'react';
import Carousel from 'react-material-ui-carousel';
import EventCard from "../cards/eventCard.molecule";
import JoinedEvents from "../mocks/getMyEvents"

const JoinedEventsCarousel = () => {
    return (
        <Carousel
            autoPlay={true}
            indicators={true}
            animation={"slide"}
            navButtonsAlwaysVisible={false}
        >
            {
                JoinedEvents.eventList.map((eventDetails) => {
                    return <EventCard {...eventDetails} key={eventDetails.eventId}/>
                })
            }
        </Carousel>
    );
}

export default JoinedEventsCarousel;
