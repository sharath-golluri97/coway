import React from 'react';
import { AccountBox, Event, Favorite, Home } from '@material-ui/icons';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';

const menuItems = [
    {
        listIcon: <Home />,
        listText: "Home"
    },
    {
        listIcon: <AccountBox />,
        listText: "Profile"
    },
    {
        listIcon: <Event />,
        listText: "My Events"
    },
    {
        listIcon: <FeedbackOutlinedIcon />,
        listText: "Feedback",
        url:"https://forms.gle/YS87NiaWszHtBFXQ9"
    }
]
export default menuItems;