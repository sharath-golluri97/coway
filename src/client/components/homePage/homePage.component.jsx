import React, { useState, useEffect } from "react";
import AllEvents from "../events/selection/cards/allEventsList.component";
import CreatedEvents from "../events/selection/carousel/createdEvents.component";
import JoinedEvents from "../events/selection/carousel/joinedEvents.component";
import { getUserInfo } from "../../../Authenticator/tokens";
import axios from "axios";
import _ from "lodash";
import Badge from "@material-ui/core/Badge";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PendingRequestList from "../events/selection/pendingRequest";
import EventSearchBar from "./eventsearch/searchBar.component";
import useStyles from "./homePage.style";
import PendingRequestData from "../events/selection/mocks/getUserGroupInfoForPendingRequest"
import ShowIfPropTrue from "../../commons/showPropIf/showPropIf";

const signalR = require("@aspnet/signalr");

// import displayUserInformation from "../../../Authenticator/UserInfo";
export default function HomePage(props) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({});
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);

  const apiBaseUrl = "http://localhost:3000";

  function sendMessage(sender, messageText, groupId, groupName, creatorUser) {
    return axios
      .post(`${apiBaseUrl}/api/notification`, {
        sender: sender,
        text: messageText,
        groupName: groupName,
        groupId: groupId,
        recipient: creatorUser,
      })
      .then((resp) => resp.data);
    /**
     * Also Call to api to save this request info in postgres db
     * */
  }
  function getMessages(userData) {
    // return axios.get(`${apiBaseUrl}/api/notification/`, getAxiosConfig(userData))
    //   .then(resp => resp.data);
    /**
     * will fetch request list from postgres db
     * **/
    return new Promise(resolve => resolve(PendingRequestData.userResponses))
  }

  function newMessage(message) {
    //if sender is not set in our case, no anonymous messages will be passed!
    // if (!message.sender) {
    //   message.sender = "anonymous";
    // } else {
      messages.push(message);
      setMessages(_.cloneDeep(messages));
    // }
  }

  function getAxiosConfig(userData) {
    const config = {
      headers: { "x-ms-client-principal-name": userData.email },
    };
    return config;
  }

  function getConnectionInfo(userData) {
    return axios
      .post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig(userData))
      .then((resp) => {
        return resp.data;
      });
  }

  const sendNewMessage = (groupId, groupName, creatorUser) => {
    sendMessage(
      userInfo.firstName,
      newMessageText,
      groupId,
      groupName,
      creatorUser
    );
    setNewMessageText("");
  };

  useEffect(() => {
    getUserInfo().then((userData) => {
      setUserInfo(userData);

      if (userData !== null) {
        console.log("retrieving messages");
        /**
         * Retrieve notifications from db
         * */
        getMessages(userData).then(messages => {
          console.log("messages", messages);
          for (let m of messages.reverse()) {
            newMessage(m);
          }

        })
          .then(()=>setReady(true));
        getConnectionInfo(userData)
          .then((info) => {
            const options = {
              accessTokenFactory: () => info.accessToken,
            };

            const connection = new signalR.HubConnectionBuilder()
              .withUrl(info.url, options)
              .configureLogging(signalR.LogLevel.Information)
              .build();

            connection.on("newMessage", newMessage);
            connection.onclose(() => console.log("disconnected"));
            connection
              .start()
              .then(() => {
                setReady(true);
              })
              .catch(console.error);
          })
          .catch(console.error);
      }
    });
  }, []);

  return (
    <div>
      <ShowIfPropTrue prop={ready}>
      <Grid container spacing={1}>
       {/* <Grid item xs={12}>
          <Typography variant={"h6"}>Welcome</Typography>
        </Grid>*/}
          <Grid item container xs={12} className={classes.searchBar}>
            <Grid item xs={10}>
              <EventSearchBar />
            </Grid>
            <Grid item xs={2}>
              <PendingRequestList notificationList={messages} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.eventList}>
            <AllEvents
              handleRequestClick={sendNewMessage}
              messageList={messages}
            />
          </Grid>
        </Grid>
      </ShowIfPropTrue>
    </div>
  );
}
