import React from 'react';
import Carousel from 'react-material-ui-carousel';
import EventCard from "../cards/eventCard.molecule";
import CreatedEvents from "../mocks/getCreatedEvents"

const CreatedEventsCarousel = () => {
    return (
        <Carousel
            autoPlay={false}
            indicators={true}
            animation={"fade"}
            navButtonsAlwaysVisible={false}
        >
            {
                CreatedEvents.eventList.map((eventDetails) => {
                   return <EventCard {...eventDetails} key={eventDetails.eventId} type={'selfCreated'}/>
                })
            }
        </Carousel>
    );
}

export default CreatedEventsCarousel;
