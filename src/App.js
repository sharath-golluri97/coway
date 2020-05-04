import React from 'react';
import AppBar from './client/commons/appBar/appBar.component';
import './App.css';
import ScrollTop from "./client/commons/appBar/scrollTop.molecule";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ChatRoom from "./client/components/chatRoom/chatRoom.component";
import ChatRoomsList from "./client/components/chatRoom/chatRoomsList.component";


function App() {
  return (
    <div>
	    {/*<ThemeProvider>*/}
		    <AppBar/>
                {/*  Include all the routes   */}
                <ChatRoomsList/>
            <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
	    {/*</ThemeProvider>*/}
    </div>
  );
}

export default App;
