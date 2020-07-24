const express = require('express');

const router = express.Router();

// Load all REST Endpoints
/**
 * Example :
 * const map = require('./example');

 router.use('/map',map);
 **/
const events = require('./events/events');
const groups = require('./groups/groups');
// const responses = require('./responses/userResponses');
// const users = require('./users/users');


router.use('/events',events);
router.use('/groups',groups);
// router.use('/responses',responses);
// router.use('/users',users);

/// API Error Handler
router.use(function(err, req, res, next) {
    if (err.response) {
        res.json({ status: { statusCode: err.response.status, statusText: err.response.statusText } });
    } else {
        res.json({ status: { statusCode: 500, statusText: 'Internal Server Error' } });
    }
});

module.exports = router;
