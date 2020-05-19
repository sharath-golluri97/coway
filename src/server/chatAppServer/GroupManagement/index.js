module.exports = function (context, req) {
    context.bindings.signalRGroupActions = [{
        "groupName": req.body.groupName,
        "userId": req.body.userId,
        "action": "add"
    }];
    context.done();
};
