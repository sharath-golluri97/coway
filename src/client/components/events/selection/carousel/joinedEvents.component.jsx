import React from 'react';
import Carousel from 'react-material-ui-carousel';
import EventCard from "../cards/eventCard.molecule";
import JoinedEvents from "../mocks/getMyEvents"

const JoinedEventsCarousel = () => {
    return (
        <Carousel
            autoPlay={false}
            indicators={true}
            animation={"fade"}
            navButtonsAlwaysVisible={false}
        >
            {
                JoinedEvents.eventList.map((eventDetails) => {
                    return <EventCard {...eventDetails} key={eventDetails.eventId} type={'joinedEvent'}/>
                })
            }
        </Carousel>
    );
}

export default JoinedEventsCarousel;
