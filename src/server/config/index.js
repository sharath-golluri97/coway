/* eslint-disable global-require */
const merge = require('lodash/merge');

const config = {
    app: { port: 8080 },
    csrf: { cookie: true },
    helmet: {},
};

module.exports = (function(env) {
    switch (env) {
        case 'qa':
            return merge(config, require('./qa'));
        case 'production':
            return merge(config, require('./production'));
        case 'development':
        default:
            return merge(config, require('./development'));
    }
})(process.env.NODE_ENV);
