import React from 'react';
import { AccountBox, Event, Favorite, Home } from '@material-ui/icons';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import RGF from 'react-google-forms'

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
        listIcon: <Favorite />,
        listText: "Favorites"
    },
    {
        listIcon: <FeedbackOutlinedIcon />,
        listText: "Feedback",
        url:"https://forms.gle/YS87NiaWszHtBFXQ9"
    }
]
export default menuItems;