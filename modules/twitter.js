module.exports = {

    // Get the most releveant and popular tweet (with most favorited/retweets) 
    // but not neccassarily latest (but a recent tweet is more prioritized)

    findTweet: function(){

        var Twitter = require('twitter');
        var client  = new Twitter({

		    access_token_key:
    			'119710335-AKBgvx71f8jmhpuJ0q8Fsh6yOYjSrq0YrZ8hHgnd',
		
	    	access_token_secret:
			    'r96eL48Qd2yEx9C0UJlvd8gwYdHgwlg06UHZQUhH7Lvfp',
		
		    consumer_key:
    			'wOI0K9TtPnmDRMcaJUM9MW6hL',
		
		    consumer_secret:
    			'w9zNUnEciOb5nHEtpMyB1m4I1weiIDU5SDkBQuUIoM4rlYqrNt'}); 

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

}
