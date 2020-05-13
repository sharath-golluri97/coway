import axios from "axios";

const { getContainer } = require("../cosmos");
const signalR = require("@aspnet/signalr");
const hubName = 'chat';
const apiBaseUrl = 'http://localhost:7071';
const authProvider = 'aad'; // aad, twitter, microsoftaccount, google, facebook
const loginUrl = `${apiBaseUrl}/.auth/login/${authProvider}?post_login_redirect_url=${encodeURIComponent(window.location.href)}`;
const logoutUrl = `${apiBaseUrl}/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.href)}`;
var signalRConnection;


export function getConnectionInfo(username) {
    return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, getAxiosConfig(username))
        .then(resp => resp.data);
}

export function getAxiosConfig(username) {
    const config = {
        headers: {'x-ms-client-principal-name': username}
    };
    // if (window.auth.token) {
    //     config.headers['X-ZUMO-AUTH'] = window.auth.token;
    // }
    return config;
}

export  function connectToSignalR(username){
     return getConnectionInfo(username).then(info => {
        info.accessToken = info.accessToken || info.accessKey;
        info.url = info.url || info.endpoint;
        const options = {
            accessTokenFactory: () => info.accessToken
        };
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(info.url, options)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        signalRConnection=connection;
        // connection.on('newMessage', onNewMessage);
        //  connection.on('groupUpdated', groupUpdated)

         console.log("connect info inside : "  + connection)
        connection.onclose(() => console.log('disconnected'));

        console.log('connecting...');
        connection.start()
            .then(() => {
                console.log("connected!");
            })
            .catch(console.error);
        return connection;
    }).catch(alert);
}

export function getSignalRConnection(){
    return signalRConnection;
}

const container = getContainer();



export async function queryGroups(querySpec) {
    console.log("querySpec: " + JSON.stringify(querySpec));
    try {
        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        const res = items;
        return res;

    } catch (err) {
        console.log("err", err);
        throw err;
    }

}

export async function createNewGroup(newGroup) {
    console.log("newGroup: " + JSON.stringify(newGroup));
    if(!newGroup.name)
        return;
    try {
        const { resource: createdItem } = await container.items.create(newGroup);
        //     console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
        const res = createdItem;
        return res;

    } catch (err) {
        console.log("err", err);
        throw err;
    }
}

export async function updateGroup(newGroup) {
    console.log("newGroup: " + JSON.stringify(newGroup));
    try {
        const { id, category } = newGroup;
        const { resource: updatedItem } = await container
        .item(id, category)
        .replace(newGroup);
        // console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`);
        //console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);
        const res = updatedItem;
        return res;

    } catch (err) {
        console.log("err", err);
        throw err;
    }
}

export async function deleteGroup(id,group) {
    console.log("id: " + id + " group: " + group);
    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
    try {
        const { resource: result } = await container.item(id, group).delete();
        console.log(`Deleted item with id: ${id}`);
        // </DeleteItem>
        const res = result;
        return res;
    } catch (err) {
        console.log("err", err);
        throw err;
    }
}

// module.exports = {
//     connectToSignalR,
//     getSignalRConnection,
//     queryGroups,
//     createNewGroup,
//     updateGroup,
//     deleteGroup
// }
