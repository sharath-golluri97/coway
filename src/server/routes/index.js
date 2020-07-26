const express = require('express');

const router = express.Router();
const notifications = require('./notifications')

// Load all REST Endpoints
/**
 * Example :
 * const map = require('./example');

 router.use('/map',map);
 **/

router.use('/notifications',notifications);

/// API Error Handler
router.use(function(err, req, res, next) {
    if (err.response) {
        res.json({ status: { statusCode: err.response.status, statusText: err.response.statusText } });
    } else {
        res.json({ status: { statusCode: 500, statusText: 'Internal Server Error' } });
    }
});

module.exports = router;
