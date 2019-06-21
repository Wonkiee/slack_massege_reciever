require("dotenv").config();
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.TOKEN);
const msgBody = process.env.MASSEGE_BODY;

module.exports = massage = () => {
  client.messages.create(
    {
      body: msgBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.USER_PHONE_NUMBER
    },
    function(err, call) {
      if (err) console.log(err);
      else console.log(call.sid);
    }
  );
};
