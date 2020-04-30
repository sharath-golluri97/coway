import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './client/commons/appBar/appBar.component';
import './App.css';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ScrollTop from "./client/commons/appBar/scrollTop.molecule";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


function App() {
  return (
    <div>
	    {/*<ThemeProvider>*/}
		    <AppBar/>
            <Container>
                <Box my={2}>

                {/*  Include all the routes   */}


                </Box>
            </Container>
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
