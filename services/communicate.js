require("dotenv").config();
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.TOKEN);
const constants = require("../utils/constants");

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
}

module.exports = new Communicate();