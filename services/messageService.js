const config = require('config');
const async = require('async');
const slackService = require('./slackService');
var _ = require('lodash');

class messageService {

    /**
     * @constructor
     */
    constructor() {
    }

    /**
     * Send a slack alert message for provided channels
     * @param {Object} event - Event object in the request body sent from slack API
     * */
    postMessagesToChannels(event) {
        const channels = config.get('slack.communication.channels');
        if (_.isEmpty(channels) || !event.channel) {
            return;
        }
        (channels).forEach(channelData => {
            if (_.includes(channelData.recieveFrom, event.channel)) {
                async.each(channelData.sendTo, (channelId, done) => {
                    slackService.postMessagesToChannels(channelId, event.text, (err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
                }, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    return;
                });

            }
        });
    }

}

module.exports = new messageService();
