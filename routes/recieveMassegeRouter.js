require("dotenv").config();
var express = require("express");
var router = express.Router();
const sendCall = require("../services/call");
const sendMassage = require("../services/massege");

KEYWORDS = [
  "SCAT",
  "SHOP",
  "CHECK",
  "DOWN",
  "ERROR",
  "ISSUE",
  "OUTAGE",
  "ASAP",
  "LOOK",
  "<!here>",
  "<!channel>",
  "UNABLE"
];

router.post("/", function(req, res, next) {
  let requestBody = req.body;

  try {
    // Verify the URL with slack
    if (requestBody.challenge) {
      res.send(requestBody.challenge);
    }
    // Process the slack massege
    else if (searchString(requestBody.event.text)) {
      sendCall(process.env.PHONE_NUMBER_ASANKA);
      sendCall(process.env.PHONE_NUMBER_WISHWA);
      sendCall(process.env.PHONE_NUMBER_RANDULA);
      sendCall(process.env.PHONE_NUMBER_RAJITHA);
      //sendMassage();
    }
    res.sendStatus(200);
  } catch (error) {
    // Respond to slack with an error code
    res.sendStatus(301);
    console.log(error);
  }
});

//Function to search a given word is exists in KEYWORDS array
searchString = keyWord => {
  stringMatched = false;

  for (i = 0; i < KEYWORDS.length; i++) {
    let regEx = new RegExp(KEYWORDS[i], "i");
    if (keyWord.match(regEx)) {
      stringMatched = true;
      return stringMatched;
    }
  }
  return stringMatched;
};

module.exports = router;
