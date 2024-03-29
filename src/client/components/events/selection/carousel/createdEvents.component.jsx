import React from 'react';
import Carousel from 'react-material-ui-carousel';
import EventCard from "../cards/eventCard.molecule";
import CreatedEvents from "../mocks/getCreatedEvents"

const CreatedEventsCarousel = () => {
    return (
        <Carousel
            autoPlay={true}
            indicators={true}
            animation={"slide"}
            navButtonsAlwaysVisible={false}
        >
            {
                CreatedEvents.eventList.map((eventDetails) => {
                   return <EventCard {...eventDetails} key={eventDetails.eventId}/>
                })
            }
        </Carousel>
    );
}

export default CreatedEventsCarousel;
