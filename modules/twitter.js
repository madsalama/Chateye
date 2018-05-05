module.exports = {
  // Get the most releveant and popular tweet (with most favorited/retweets)
  // but not neccassarily latest (but a recent tweet is more prioritized)

  findTweet: function() {
    var Twitter = require("twitter");
    var client = new Twitter({
      access_token_key: "",

      access_token_secret: "",

      consumer_key: "",

      consumer_secret: ""
    });

    // ===============================================

    // var params = {screen_name: '_zalterego'};

    /**
 * 
 * client.get('search/tweets', {q: '#funny'}, function(error, tweets, response) {

    

    // var text = tweets[1].text;

    console.log("======== TWEETS SIZE ======");
    console.log(JSON.stringify(Object.keys(tweets).length)); 
    
    console.log(tweets); 

    // console.log("======= FIRST TWEET IN OBJECT ========");
    // console.log(JSON.stringify(text));


    returns tweet text 

});

 * 
 */
  }
};
