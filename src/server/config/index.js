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
            return merge(config, require('./config.qa.json'));
        case 'production':
            return merge(config, require('./config.production.json'));
        case 'development':
        default:
            return merge(config, require('./config.development.json'));
    }
})(process.env.NODE_ENV);
