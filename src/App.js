import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

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
import AuthProvider from "./Authenticator/authProvider";
import AzureAD from "react-aad-msal";

const ChatAppAsync = lazy(() => import("./client/components/chatRoom/chatApp"));
const HomePageAsync = lazy(() => import("./client/components/homePage/homePage.component"));
const CreateChatRoomAsync = lazy(() => import("./client/components/chatRoom/createChatRoom"));
const ChatRoomAsync = lazy(() => import("./client/components/chatRoom/chatRoom.component"));

//Custom Chat -> for Azure Service Bus

const ChatAppCustomAsync = lazy(() => import("./client/components/chatRoomCustom/chatApp"));



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
        <AzureAD provider={AuthProvider} forceLogin={true}>
        <div>
          <AppBar />
          <Container >
              <Route exact path="/" component={withSuspense(HomePageAsync)} />
              <Route exact path="/chat" component={withSuspense(ChatAppAsync)} />
              <Route path="/chat/create" component={withSuspense(CreateChatRoomAsync)} />
              <Route exact path="/chat/rooms" component={withSuspense(CreateChatRoomAsync)} />
              <Route path="/chat/rooms/:roomId" component={withSuspense(ChatRoomAsync)} />
              <Route exact path="/chatCustom" component={withSuspense(ChatAppCustomAsync)} />

          </Container>
          <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
        </AzureAD>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
