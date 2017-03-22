#!/bin/env node

var express = require('express');
var compression = require('compression');
var fs      = require('fs');
var cors = require('cors');
var Twitter = require('twitter');
var request = require('request');
var language = require('@google-cloud/language')


var client  = new Twitter({
	
		access_token_key:
			'119710335-AKBgvx71f8jmhpuJ0q8Fsh6yOYjSrq0YrZ8hHgnd',
		
		access_token_secret:
			'r96eL48Qd2yEx9C0UJlvd8gwYdHgwlg06UHZQUhH7Lvfp',
		
		consumer_key:
			'wOI0K9TtPnmDRMcaJUM9MW6hL',
		
		consumer_secret:
			'w9zNUnEciOb5nHEtpMyB1m4I1weiIDU5SDkBQuUIoM4rlYqrNt'
}); 	

var params = {screen_name: '_zalterego'};

client.get('followers/list', params, function(error, followers, response){
  if (!error) {

  // https://api.twitter.com/1.1/search/tweets.json
  // ?q=from%3ACmdr_Hadfield%20%23nasa&result_type=popular

// Following 

//Object.keys(followers).forEach(function (key) {
//  var val = followers[key];
//  console.log(val[0]);
  // console.log(key);
   // do something with key or value
// });

  }
});



var App = function() {

    //  Scope.
    var self = this;

    self.setupVariables = function() {
        
    };

    // Populate the cache
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
           // self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        // self.zcache['index.html'] = fs.readFileSync('./index.html');
    };

    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };

    // ==========================
    //    MAIN APP LOGIC HERE
    // ==========================
	
    self.initializeServer = function() {
		
		self.app = express();
        self.app.set('port', (process.env.PORT || 8080));
     
        self.app.use(compression()); //use compression
        self.app.use(cors());
        self.app.use(express.static('static'));

self.app.get('/ai', function(request, response) {
  
  /** VERIFICATION CODE = DONE! **/

           if (request.query['hub.mode'] === 'subscribe' &&
      request.query['hub.verify_token'] === 'chatzer') {
    console.log("Validating webhook");
    response.status(200).send(request.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    response.send(403);          
  }
   
/*


var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.send(200);
  }


*/

});

		// self.app.use(bodyParser.urlencoded({ extended: false }));
		// self.app.use(bodyParser.json());


        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.post(r, self.routes[r]);
        }


    };

    self.initialize = function() {
		        // Create the express server and routes.
        self.initializeServer();
		
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();



var languageClient = language({
  projectId: 'nlpi-162211',
  keyFilename:'./NLPI-c6ba16b1d273.json'
});

languageClient.detectEntities('Stephen of Michigan!', function(err, entities) {
  // entities = {
  //   people: ['Stephen'],
  //   places: ['Michigan']
  // }
});

var document = languageClient.document('Contributions welcome!');


document.annotate(function(err, annotations) {
  // annotations = {
  //   language: 'en',
  //   sentiment: 100,
  //   entities: {},
  //   sentences: ['I am feeling very amazing today!!'],
  //   tokens: [
  //     {
  //       text: 'Contributions',
  //       partOfSpeech: 'Noun (common and proper)',
  //       partOfSpeechTag: 'NOUN'
  //     },
  //     {
  //       text: 'welcome',
  //       partOfSpeech: 'Verb (all tenses and modes)',
  //       partOfSpeechTag: 'VERB'
  //     },
  //     {
  //       text: '!',
  //       partOfSpeech: 'Punctuation',
  //       partOfSpeechTag: 'PUNCT'
  //     }
  //   ]
  // }

  console.log(annotations);
});








    };
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.app.get('port'), function() {
            console.log('Node app is running on port', self.app.get('port'));
        });
    };
	self.init = function(){
         // Read topScore from DB table
	};

	


// ============= CHATZER! - CHATBOT for FB Messenger Challenge! ==============
// Chatzer! The anti-boredom chatbot!
    // -A- Connects to Instagram/Twitter/Youtube for entertainment suggestions! (~heavy usage of messengerAPI here~)
    // -B- Talkative Personality !
        // GoogleNLP - define sentiment of messages
        // Route to Multiple intents (Trainable AI using recast.ai / api.ai)

function callSendAPI(messageData) {

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

var options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
    method: 'POST',
    json: messageData
}

request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });

}



function sendTextMessage(recipientId, messageText) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function sendGenericMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);

}



function receivedMessage(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

/**
 * 
 * // Create a document if you plan to run multiple detections.
var document = language.document(messageText);

// Analyze the sentiment of the document.
var sentiment = document.detectSentiment(function(err, sentiment) {
  // sentiment = 100 // Large numbers represent more positive sentiments.
});

console.log("Sentiment ="+ sentiment); 
 * 
 */



  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  } 


}


// Call back for the URL (webhook)
// This function is supposed to send/receive messages.

// Involved parties: 
    // FB MessengerAPI - nodeJS - AI API - YT/TWITTER/MUSICXMATCH API 

    self.chatzer = function(req, res){
  
  

    };
	

};


var pikdox = new App();
pikdox.initialize();
pikdox.start();


