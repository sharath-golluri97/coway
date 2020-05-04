module.exports = function (context, req, groups) {
    context.res.body = groups;
    context.done();
};
