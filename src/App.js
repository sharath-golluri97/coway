import React, { lazy, Suspense } from "react";
import { HashRouter,Router, Route, Switch, withRouter } from "react-router-dom";

import Container from "@material-ui/core/Container";
import AppBar from "./client/commons/appBar/appBar.component";
import "./App.css";
import ScrollTop from "./client/commons/appBar/scrollTop.molecule";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AuthProvider from "./Authenticator/authProvider";
import AzureAD from "react-aad-msal";
import LinearProgress from '@material-ui/core/LinearProgress';
import LabelBottomNavigation from "./client/commons/bottomNavBar/bottomNavBar.component";
import {Grid} from "@material-ui/core";


const HomePageAsync = lazy(() => import("./client/components/homePage/homePage.component"));
const CreateEventAsync = lazy( () => import("./client/components/events/creation/createEvent.component"));
const MapViewAsync = lazy( () => import("./client/components/events/selection/maps/mapView.component"));
const NotificationsAsync = lazy( () => import("./client/components/notifications/notifications.component"));
const NotFoundAsync = lazy( () => import("./client/components/notFound/notFound.component"));

//Custom Chat -> for Azure SignalR and Azure Cosmos DB
const GroupInfoAsync = lazy(()=> import("./client/components/chatRoom/groupInfo"));
const ChatAppAsync = lazy(()=> import("./client/components/chatRoom/chatApp"));
const EventDetailsAsync = lazy(()=> import("./client/components/events/eventDetails.component"));

/**
 * HOC to wrap dynamically imported routes with React.Suspense fallback loader
 */
function withSuspense(WrappedComponent, loader) {
  return function (props) {
    return (
      <Suspense
        fallback={
          <div className="centered"><LinearProgress color="secondary" /></div> || <div>Loading...</div>
        }
      >
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

const pageWithBottomNavBar = ["/","/notifications","/mapView","/create","/chatRoom","/chatRoom/chat/:id", "/events/:id"];
const page = [];


function App() {
  return (
    <HashRouter>
      <Switch>
        <AzureAD provider={AuthProvider} forceLogin={true}>
        <div>
          <AppBar />
          <Route exact path={page} component={CustomContainer}/>
          <Route exact path={pageWithBottomNavBar} component={DefaultContainer}/>
        </div>
        </AzureAD>
      </Switch>
    </HashRouter>
  );
}

const DefaultContainer = () => (
  <Grid container >
    <Grid item xs={12} style={{height:'86.2vh',overflowY:'scroll'}}>
      <Container >
        <Route exact path="/" component={withSuspense(HomePageAsync)} />
        <Route exact path="/chatRoom" component={withSuspense(GroupInfoAsync)} />
        <Route exact path="/create" component={withSuspense(CreateEventAsync)}/>
        <Route exact path="/mapView" component={withSuspense(MapViewAsync)}/>
        <Route exact path="/notifications" component={withSuspense(NotificationsAsync)}/>
        <Route path="/chatRoom/chat/:id" component={withSuspense(ChatAppAsync)} />
        <Route path="/events/:id" component={withSuspense(EventDetailsAsync)} />
      </Container>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Grid>
    <Grid item xs={12} style={{zIndex:1}}>
      <LabelBottomNavigation/>
    </Grid>
  </Grid>
);

const CustomContainer = () => (
  <Grid container >
  <div>
    <Container >
      
    </Container>
    <ScrollTop>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </div>
  </Grid>

);


export default App;
