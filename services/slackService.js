const config = require('config');
const safeJsonStringify = require('safe-json-stringify');
const { WebClient } = require('@slack/client');

class slackService {

  /**
   * @constructor
   */
  constructor() {
    this.webClient = new WebClient(config.get('slack.botToken'));
  }

  /**
   * Send a slack alert message for provided channels
   * @param {Array} channelId - Array which contains the channel id's of channels which the messages should be sent to.
   * @param {String} message - message to be sent to above channels
   * @param {Function} callback - callback function
   * */
  postMessagesToChannels(channelId, message, callback) {
    this.webClient.chat.postMessage({ channel: channelId, text: message })
      .then((res) => {
        return callback(null, res);
      })
      .catch((err) => {
        console.log("Error occurred in sending slack message: " + safeJsonStringify(err));
        return callback(err);
      });
  }
}

module.exports = new slackService();
