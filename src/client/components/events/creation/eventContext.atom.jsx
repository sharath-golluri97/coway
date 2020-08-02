import React, { createContext, useState } from "react";
export const EventContext = createContext([{}, () => {}]);

export default props => {
    const [state, setState] = useState({
        user: {
            user_id: 0,
            eventname: "",
            startdate: new Date().toISOString().slice(0, 16),
            city: 1,
            location: {
              lat : 12.925297,
              long : 77.669237
            },
            cityname: "BANGALORE",
            maxparticipants: 4,
            // desc
            description: "",
            remarks: "",
            // questionnaire
            q1: "Why do you want to join the group?",
            q2: "",
            q3: "",
        },
        errors: {}
    });
    return (
        <EventContext.Provider value={[state, setState]}>
            {props.children}
        </EventContext.Provider>
    );
};
