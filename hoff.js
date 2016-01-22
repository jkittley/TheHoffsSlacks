module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    versiom: 0.1,
    text : 'Hello, ' + userName + '!'
  };

  var guess = req.body.text;

  // Connect to twitter
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token_key: process.env.twitter_access_token_key,
    access_token_secret: process.env.twitter_access_token_secret
  });

  // // Post message to twitter
  var twitter_string = 'The Slack user: ' + userName + ' suggested: '+ guess;
  client.post('statuses/update', { status: twitter_string },  function(error, tweet, response){
    if(error) throw error;
    console.log(tweet);  // Tweet body. 
    console.log(response);  // Raw response object. 
  });

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}