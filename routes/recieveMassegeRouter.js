require("dotenv").config();
const express = require("express");
const router = express.Router();
const communicate = require("../services/communicate");
const constants = require("../utils/constants");
const activeNumbers = require('../resources/activeNumbers');
const SERVICE_STATUS_TYPES = constants.SERVICE_STATUS_TYPES;
const ACTIVE_NUMBERS = constants.ACTIVE_NUMBERS;
let SERVICE_STATUS = SERVICE_STATUS_TYPES.RUNNING;

router.post("/", function(req, res) {
  let requestBody = req.body;
console.log('now', SERVICE_STATUS);
  try {
    if (!requestBody) {
      res.sendStatus(200);
      return;
    }
    if(requestBody.stopService) {
      SERVICE_STATUS = SERVICE_STATUS_TYPES.STOPPED;
    }
    if(requestBody.startService) {
      SERVICE_STATUS = SERVICE_STATUS_TYPES.RUNNING;
    }
    console.log('then', SERVICE_STATUS);
    if (requestBody.challenge) {
      res.send(requestBody.challenge);
      return;
    }
    else if //(requestBody.event && requestBody.event.text && stringHandle.isValidSlackChannel(requestBody.event.channel)
      //&& stringHandle.searchString(requestBody.event.text, constants.KEYWORDS)) {
        (requestBody.event && requestBody.event.text){
        if (SERVICE_STATUS === SERVICE_STATUS_TYPES.RUNNING) {
          //communicate.callUser(process.env.PHONE_NUMBER_ASANKA);
          //communicate.callUser(process.env.PHONE_NUMBER_WISHWA);
          //communicate.callUser(process.env.PHONE_NUMBER_RANDULA);
          if(communicate.getUserActiveState(process.env.PHONE_NUMBER_RAJITHA) === SERVICE_STATUS_TYPES.RUNNING) {
            communicate.callUser(process.env.PHONE_NUMBER_RAJITHA);
          }
        }
    }
    res.sendStatus(200);
    return;
  } catch (error) {
    res.sendStatus(301);
    console.log(error);
    return;
  }
});

router.get("/", function(req, res) {
  console.log('called')
  res.sendStatus(200);
});

router.get("/active-numbers", function(req, res) {
  res.send(ACTIVE_NUMBERS).status(200);
});

router.post("/active-numbers", function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);;
  }
  if(req.body.startService){
    console.log('start');
    communicate.setUserActiveState(req.body.phoneNumber, true);
    return res.sendStatus(200);
  }
  if(req.body.stopService){
    console.log('stop');
    communicate.setUserActiveState(req.body.phoneNumber, false);
    return res.sendStatus(200);
  }
});

router.get("/active-numbers-status", function(req, res) {
  if(!req || !req.body || req.body.phoneNumber) {
    return res.sendStatus(400);
  }
  res.send(activeNumbers.ACTIVE_NUMBERS).status(200);
});


module.exports = router;
