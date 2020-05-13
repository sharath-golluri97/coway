const express = require('express');

const router = express.Router();
const chat = require('./chat');

// Load all REST Endpoints
route.use('/chat',chat);

/// API Error Handler
router.use(function(err, req, res, next) {
    if (err.response) {
        res.json({ status: { statusCode: err.response.status, statusText: err.response.statusText } });
    } else {
        res.json({ status: { statusCode: 500, statusText: 'Internal Server Error' } });
    }
});

module.exports = router;
