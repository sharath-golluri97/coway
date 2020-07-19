import React, { createContext, useState } from "react";
export const EventContext = createContext([{}, () => {}]);

export default props => {
    const [state, setState] = useState({
        user: {
            eventname: "",
            startdate: new Date().toISOString().slice(0, 10),
            city: "",
            // ["Bengaluru", "Hyderabad", "Delhi", "Mumbai"]
            location: {
                lat : 0.00,
                long : 0.00
            },
            maxparticipants: 2,
            // desc
            description: "",
            remarks: "",
            // questionnaire
            q1: "Why do you want to join the group?",
            q2: "Extrovert or introvert?",
            q3: "Tell us about you?",
        },
        errors: {}
    });
    return (
        <EventContext.Provider value={[state, setState]}>
            {props.children}
        </EventContext.Provider>
    );
};
