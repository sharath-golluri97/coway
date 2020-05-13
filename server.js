const bodyParser = require('body-parser');
const compression = require('compression');
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const cors = require('cors')
const express = require('express');
const expressPinoLogger = require('express-pino-logger');
const helmet = require('helmet');
const path = require('path');
// const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const routes = require('./src/server/routes');
const config = require('./src/server/config');
const { serverAccessLogger } = require('./src/server/utils/logger');

const app = express();

/* Load base middlewares */
app.use(helmet(config.helmet));
app.use(expressPinoLogger({ logger: serverAccessLogger }), function(req, res, next) {
    req.log.info('request received');
    next();
});
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(compression());

/* Load routes */
if (process.env.NODE_ENV !== 'development') {
    app.use(['/api', '/graphql'], function(req, res, next) {
        csrf(config.csrf)(req, res, next);
    });
}
app.use('/api', routes);
// app.use('/graphql', graphql);

if (process.env.NODE_ENV !== 'development') {

    app.use(history());
    // app.use(serveFavicon(path.join(__dirname, 'static', 'favicon.ico')));
    app.get('/index.html', csrf(config.csrf), function(req, res) {
        res.cookie('XSRF-TOKEN', req.csrfToken()).sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    app.use(serveStatic(path.join(__dirname, 'build')));
    app.use(serveStatic(path.join(__dirname, 'static')));
}
// Fallback Error Handler
app.use(function(err, req, res, next) {
    res.status(500).send();
});

app.listen(config.app.port, function() {
    console.log(`App listening on port ${config.app.port}!\n`);
});
