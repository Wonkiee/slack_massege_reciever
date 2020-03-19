const express = require("express");
const router = express.Router();
const constants = require("../utils/constants");
const messegeService = require("../services/messageService");

router.post("/", (req, res) => {
  let requestBody = req.body;

  if (requestBody && requestBody.challenge) {
    return res.send(requestBody.challenge);
  }
  res.sendStatus(constants.RESPONSE_CODES.SUCCESS);
  if (requestBody.event && requestBody.event.text) {
    return messegeService.postMessagesToChannels(requestBody.event)
  }
});
module.exports = router;
