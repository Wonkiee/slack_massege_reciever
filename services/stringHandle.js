const constants = require("../utils/constants");

class StringHandle {

    searchString (keyWord, keysArray) {
        let stringMatched = false;

        for (let i = 0; i < keysArray.length; i++) {
            let regEx = new RegExp(keysArray[i], "i");
            if (keyWord.match(regEx)) {
                stringMatched = true;
                return stringMatched;
            }
        }
        return stringMatched;
    };

    isValidSlackChannel (channelId) {
        let slackChannelsObject = constants.SLACK_CHANNEL_IDS;
        for (let key in slackChannelsObject){
          if (slackChannelsObject[key] === channelId) {
            return true;
          }
        }
        return false;
    }
}

module.exports = new StringHandle();