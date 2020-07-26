const express = require('express');
const router = express.Router();
const {logger} = require("../../utils/logger");
const { isExistingUser, createUser } = require('../../services/users/UserService');
const {cacheMiddleware} = require("../../utils/cache");

router.get("/userdetails", cacheMiddleware(6000), async function (req, res, next) {
    try{
        logger.info(`Entered ${req.originalURL} route`);
        console.log("query" , req.query);
        console.log("reqparams" , req.params);
        const {email} = req.query;
        var request = {};
        request['email']= email;
        console.log('userDetails', request);
        const data = await isExistingUser(request);
        res.send(data.data);
    } catch(error) {
        console.log("error in user details", error);
        next(error);
    }
});

router.post("/create", async function (req, res, next) {
    console.log("request came..");
    try{
        logger.info(`Entered ${req.originalURL} route`);
        console.log("requested..", req.body);
        const {name, firstName, email, lastName} = req.body.params;
        var request = {};
        request['full_name']=firstName + ' ' + lastName;
        request['email']= email;
        request['is_verified']= true;
        request['is_active']= true;
        request['contact']= 0;
        request['remarks']= '';
        request['username']= email.split('@')[0];
        logger.info("params", request);
        console.log("params", request);
        const data = await createUser(request);
        res.send(data.data);
    } catch(error) {
        console.log("error in create user", error);
        next(error);
    }
});

module.exports = router;