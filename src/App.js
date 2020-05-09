import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import Container from "@material-ui/core/Container";
import AppBar from "./client/commons/appBar/appBar.component";
import "./App.css";
import Box from "@material-ui/core/Box";
import ScrollTop from "./client/commons/appBar/scrollTop.molecule";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import displayUserInformation from "./Authenticator/UserInfo";
import ChatRoomsList from "./client/components/chatRoom/chatRoomsList.component";
import ChatApp from "./client/components/chatRoom/chatApp";

const ChatAppAsync = lazy(() => import("./client/components/chatRoom/chatApp"));

/**
 * HOC to wrap dynamically imported routes with React.Suspense fallback loader
 */
function withSuspense(WrappedComponent, loader) {
  return function (props) {
    return (
      <Suspense
        fallback={
          <div className="centered">Loader</div> || <div>Loading...</div>
        }
      >
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <AppBar />
          <Container>
            <Box my={2}>
              <Route exact path="/" component={} />
              <Route path="/chat" component={withSuspense(ChatAppAsync)} />
            </Box>
          </Container>
          <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
