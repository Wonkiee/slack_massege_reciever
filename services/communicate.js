require("dotenv").config();
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.TOKEN);
const constants = require("../utils/constants");
const SERVICE_STATUS_TYPES = constants.SERVICE_STATUS_TYPES;
const activeNumbers = require('../resources/activeNumbers');
let ACTIVE_NUMBERS = activeNumbers.ACTIVE_NUMBERS;

class Communicate {

  callUser (userPhoneNumber) {
    client.calls.create(
      {
        url: process.env.TWILIO_CALL_URL,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userPhoneNumber
      },
      (err, call) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(call.sid);
          console.log("Calling: ", userPhoneNumber);
        }
      }
    );
  };

  massageUser (userPhoneNumber) {
    client.messages.create(
      {
        body: msgBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userPhoneNumber
      },
      (err, call) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(call.sid);
        }
      }
    );
  };

  getUserActiveState(userhoneNumber) {
    return ACTIVE_NUMBERS[userhoneNumber].ACTIVE_STATE;
  }

  setUserActiveState(userhoneNumber, status) {
    if(status) {
      ACTIVE_NUMBERS[userhoneNumber].ACTIVE_STATE = SERVICE_STATUS_TYPES.RUNNING;
      return;
    }
    ACTIVE_NUMBERS[userhoneNumber].ACTIVE_STATE = SERVICE_STATUS_TYPES.STOPPED;
    return;
  }

  isPhoneNumberActive(phoneNumber) {
    if(ACTIVE_NUMBERS[phoneNumber] === SERVICE_STATUS_TYPES.RUNNING) {
      return true;
    }
    return false;
  }
}

module.exports = new Communicate();