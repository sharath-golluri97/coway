module.exports = function (context, req) {
    const message = req.body;
    if (req.headers && req.headers['x-ms-client-principal-name']) {
        message.sender = req.headers['x-ms-client-principal-name'];
    }

    // let recipientUserId = '';
    // if (message.recipient) {
    //     recipientUserId = message.recipient;
    //     message.isPrivate = true;
    // }
    console.log("message body oin grp management: " + JSON.stringify(message));
    context.bindings.signalRGroupActions = [{
        "userId": message.sender,
        "groupName": message.groupName,
        "actions": "add"
    }];
    context.res.body = message;
    context.done();
};
