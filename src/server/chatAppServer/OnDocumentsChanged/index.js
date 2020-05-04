module.exports = function (context, updatedGroups) {
    context.bindings.signalRMessages =
        updatedGroups.map(group => ({
            target: 'groupUpdated',
            arguments: [group]
        }));
    context.done();
};
