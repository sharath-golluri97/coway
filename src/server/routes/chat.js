const express = require("express");
const {logger} = require("../utils/logger");

const {queryGroups,createNewGroup,updateGroup,deleteGroup} = require("../../client/services/chat");

const router = express.Router();

router.get("/getGroups", async function (req, res, next) {
    try{
        const params = req.query;
        logger.info(`Entered ${req.originalURL} route`);
        const data = await queryGroups(params);
        res.send(data);
    } catch(error) {
        console.log("error in getAdvNameAndOfferTag", error);
        next(error);
    }
});


// router.post("/updateGroups", async function (req, res, next) {
//     try{
//         const params = req.body;
//         console.log("params->", params);
//         logger.info(`Entered ${req.originalURL} route`);
//         const data = await updateAdvForAff(params);
//         res.send(data.data);
//     } catch(error) {
//         console.log("error in updateAdvForAff", error);
//         next(error);
//     }
// });

module.exports = router;
