const express = require('express');

const router = express.Router();
const notifications = require('./notifications')

// Load all REST Endpoints
/**
 * Example :
 * const map = require('./example');

 router.use('/map',map);
 **/
const cities = require('./cities/cities');
const events = require('./events/events');
const groups = require('./groups/groups');
const users = require('./users/users');
// const responses = require('./responses/userResponses');
// const users = require('./users/users');
router.use('/users',users);
router.use('/events',events);
router.use('/groups',groups);
router.use('/cities',cities);

// router.use('/responses',responses);
// router.use('/users',users);

router.use('/notifications',notifications);

/// API Error Handler
router.use(function(err, req, res, next) {
    console.log(err);
    if (err.response) {
        res.json({ status: { statusCode: err.response.status, statusText: err.response.statusText } });
    } else {
        console.log('erroring');
        res.json({ status: { statusCode: 500, statusText: 'Internal Server Error' } });
    }
});

module.exports = router;
