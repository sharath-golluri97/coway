import React from 'react';
import { Home } from '@material-ui/icons';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
const menuItems = [
    {
        listIcon: <Home />,
        listText: "Home",
        url: '/'
    },
    {
      listIcon: <PeopleOutlineIcon />,
      listText: "My Groups",
      url: "/chatRoom"
    },
    {
        listIcon: <FeedbackOutlinedIcon />,
        listText: "Feedback",
        url:"https://forms.gle/YS87NiaWszHtBFXQ9"
    },
    // {
    //   listIcon: <HelpOutlineIcon />,
    //   listText: "Help",
    //   url:""
    // },
    {
      listIcon: <InfoOutlinedIcon />,
      listText: "About",
      url:""
    },

]
export default menuItems;
