require("dotenv").config();
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.TOKEN);

module.exports = Call = (userPhoneNumber) => {
  client.calls.create(
    {
      url: process.env.TWILIO_CALL_URL,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: userPhoneNumber//process.env.USER_PHONE_NUMBER
    },
    function(err, call) {
      if (err) console.log(err);
      else console.log(call.sid);
    }
  );
};
