import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './client/commons/appBar/appBar.component';
import './App.css';

function App() {
  return (
    <div>
	    <ThemeProvider>
		    <AppBar/>
	    </ThemeProvider>
      {/* Welcome to Coway! */}
      {/*Add landing page component here  */}
    </div>
  );
}

export default App;
