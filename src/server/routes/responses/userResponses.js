const express = require('express');
const router = express.Router();
const {logger} = require("../../utils/logger");
const { createJoinRequest } = require('../../services/responses/ResponseService');

router.post("/joinRequest", async function (req, res, next) {
    try{
        const params = req.body;
        const data = await createJoinRequest(params);
        res.send(data.data);
    } catch(error) {
        console.log("error in user details", error);
        next(error);
    }
});


module.exports = router;