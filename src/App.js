import React from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import AppBar from './client/commons/appBar/appBar.component';
import './App.css';
import displayUserInformation from "./Authenticator/UserInfo";

function App() {
  return (
    <div>
		    <AppBar/>
		    <Container>
					<Box>
						{displayUserInformation()}
					</Box>
		    </Container>
    </div>
  );
}

export default App;
