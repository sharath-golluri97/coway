module.exports = function (context, req) {
    const message = req.body;
    if (req.headers && req.headers['x-ms-client-principal-name']) {
        message.sender = req.headers['x-ms-client-principal-name'];
    }


    console.log("message body in grp management: " + JSON.stringify(message));
    context.bindings.signalRGroupActions = [{
        "userId": message.sender,
        "groupName": message.groupName,
        "action": "add"
    }];
    context.res.body = message;
    context.done();
};
