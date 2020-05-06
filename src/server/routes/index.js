const express = require('express');

const router = express.Router();
// const example = require('./example');
// const wdemand = require('./wdemand');
// const tools = require('./tools');
// const commons = require('./commons');

// Load all REST Endpoints
// router.use('/example', example);
// router.use('/locale', require('./locale'));
// router.use('/wdemand',wdemand);
// router.use('/tools', tools);
// router.use('/commons', commons);
/// API Error Handler
router.use(function(err, req, res, next) {
    if (err.response) {
        res.json({ status: { statusCode: err.response.status, statusText: err.response.statusText } });
    } else {
        res.json({ status: { statusCode: 500, statusText: 'Internal Server Error' } });
    }
});

module.exports = router;
