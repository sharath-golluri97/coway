module.exports = {
    postObj : {
        events: {
            name : "early morning ride",
            description: "Join me on a ride from airport to Bellandur",
            city_id : 3,
            event_type_id : 1,
            remarks : "There's a lot of luggage",
            event_start_time : "2020-05-25 05:40:00",
            latitude : 12.924604,
            longitude : 77.669603,
            is_active : true
        },
        questionnaire: {
            question_1: "4356",
            question_2: "",
            question_3: "",
            required_questions : [
                1
            ]
        },
        groups : {
            creator_id: 1,
            max_participants : 2
        }

    },
    response: {
        event: {
            id: 123
        }
    }
}
