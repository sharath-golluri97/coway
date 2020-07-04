module.exports = function (context, req) {
    context.bindings.cosmosDBMessage = req.body;
    context.bindings.signalRMessages = [{
        "groupName": req.body.groupName,
        "target": "newMessage",
        "arguments": [req.body]
    }];

    context.done();
};
