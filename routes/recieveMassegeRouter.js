require("dotenv").config();
const express = require("express");
const router = express.Router();
const communicate = require("../services/communicate");
const constants = require("../utils/constants");
const stringHandle = require("../services/stringHandle");

router.post("/", function(req, res) {
  let requestBody = req.body;

  try { console.log(requestBody)
    if (!requestBody) {
      res.sendStatus(200);
    }
    else if (requestBody.challenge) {
      res.send(requestBody.challenge);
    }
    else if (requestBody.event && requestBody.event.text && stringHandle.isValidSlackChannel(requestBody.event.channel)
      && stringHandle.searchString(requestBody.event.text, constants.KEYWORDS)) {
      //communicate.callUser(process.env.PHONE_NUMBER_ASANKA);
      //communicate.callUser(process.env.PHONE_NUMBER_WISHWA);
      //communicate.callUser(process.env.PHONE_NUMBER_RANDULA);
      communicate.callUser(process.env.PHONE_NUMBER_RAJITHA);
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(301);
    console.log(error);
  }
});
module.exports = router;
