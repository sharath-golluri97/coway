import React from 'react';
import { AccountBox, ContactMail, Event, Favorite, Home } from '@material-ui/icons';

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
        listIcon: <ContactMail />,
        listText: "Invite Friends"
    }
]
export default menuItems;