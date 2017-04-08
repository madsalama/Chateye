#!/bin/env node

// ========================================
//       Chatzer - A friendly AI
// ========================================
    
    // Chatzer learns to be your bestfriend, who you would talk to when you're bored/not feeling well/in a good sharing mood
    // it will sympathize and listen then try to make you feel better or celebrate with you!

    // Contexts | what it does // 
        // "mutually_identify"/greet/small_talk/"listen"/sympathize/entertain/handle_repetition/bye_bye
        // remember user's "emotional_state"" | confirms it via +ve/-ve feedback from the user.

  // Chatzer offers a personalized experience for each user... 
    // as it detects "mood patterns"" and saves your 'personality type' and 'preferences'.

    // Chatzer uses google Speech API/translateAPI 
    // to listen to audio/texts in other languages other than english
    // English/Arabic/Japanese

// BONUS: Chatzer can detect your mood based on a selfie feature 
// + textual/audio sentiment analysis using KAIROS API 

// GAME VISUAL RESPONSE: It can response by a chatzer GIF as it detects your emotions 
     // confused (dont know - not sure)
    // sad - surprise - angry 


// ==========================
//     Integration list 
// ==========================

  // 1- API.AI            = DONE 
  // 2- Google NLP        = DONE  

    // get overall sentiment of a message if AI context is 'sentiment-required' 
    // get parts of speech to detect whether user is talking about themselves or about chatzer (You are awesome | I am bored)
    // get adjectives to be able to only send the adjective to detect whether it's positive or negative. (you are awesome vs you are terrible)
    // a list of 100 most common pos/neg adjectives is going to be used in API.AI 
    // emotional response can be a custom chatzer gif with a moving eye and a smile/frown/etc 

  // 3- MessengerAPI      = DONE 

// User is asked about his prferences/hobbies and will be suggested media from these platforms 
// media types are: tweet - instagram pic - giphy gif - youtube video (music/etc) - music+lyrics (sing-a-long)

  // 4- Youtube           = 
  // 5- Instagram         = 
  // 6- Twitter           = DONE 
  // 7- GIPHY             = DONE
  // 8- MusicXmatch       = 

  // 9- Speech API/translateAPI = a SLOW WIP (Speech is in BETA on only works with .raw audio files - messenger works with MP4 audio)

  // Translate ANY language (text/audio) to English to process it in API.AI
  // If input is in certain language/output should be in the same language. (BIDIRECTIONAL)

  // 10-KAIROS.API       = DONE 

// ==================
//    NOTE TO SELF 
// ==================
// This is a huge project to be handled by one person... 
// who's also doing a full time job and has limited time and energy 
// in less than freaking 30 days ONLY! - I am doing it anyway! It's a light hack though! ;) 

// NodeJS is perfect because it's only a JSON API Server that does not do any heavy processing/io 
// - which is awesome, super fast and efficient! - also I only know JS pretty well enough! <3 

require('newrelic');
var express = require('express');
var compression = require('compression');
var fs      = require('fs');
var cors = require('cors');
var request = require('request');

var language = require('@google-cloud/language');
var speech = require('@google-cloud/speech');
const vision = require('@google-cloud/vision');

var visionClient = vision({
projectId: 'nlpi-162211',
keyFilename: './NLPI-c6ba16b1d273.json'
});
      
var mvision = require('./modules/vision');
var mkairos = require('./modules/kairos');
var mgiphy = require('./modules/giphy');
var maudio = require('./modules/audio');

var base64 = require('base-64');

var bodyParser = require("body-parser");

var apiai = require('apiai');
var app = apiai("686ce1c23e2d49fb9036a728a6ec8b3f");

var languageClient = language({
  projectId: 'nlpi-162211',
  keyFilename:'./NLPI-c6ba16b1d273.json'
});

var speechClient = speech({
  projectId: 'nlpi-162211',
  keyFilename: './NLPI-c6ba16b1d273.json'
});



/***
 *  var audio = './audio.raw'  ; 
  speechClient.recognize(audio, {
  encoding: 'LINEAR16',
  sampleRate: 16000

}, function(err, transcript) {
  console.log(transcript);
  console.log(err);

});

 */


var App = function() {

    var self = this; 

    self.initializeServer = function() {
		
		self.app = express();
    self.app.use(express.static('static'));

        self.app.set('port', (process.env.PORT || 8080));
     
        self.app.use(compression()); 
        self.app.use(cors());
     

        self.app.use(bodyParser.urlencoded({ extended: false }));
		    self.app.use(bodyParser.json());


 /**
  * 

result: { 

  source: 'agent',
  resolvedQuery: 'Hi there!',
  action: '',
  actionIncomplete: false,
  
  parameters: { greetings: 'Hello, there!' },
  contexts: [],

  metadata: { 
    intentId: 'e3a3186e-3edd-4cf7-a72e-6cc649c3afc3',
    webhookUsed: 'false',
    webhookForSlotFillingUsed: 'false',
    intentName: 'greet' },
    
  fulfillment: { 
      speech: 'Aloha! How\'s your day going!?', messages: [Object] },
      score: 1 },
      status: { code: 200, errorType: 'success' },
      sessionId: '1450043748391296' 
}


  */



function callSendAPI(messageData) {

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};

var options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
    method: 'POST',
    json: messageData
};

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

function sendMediaMessage(recipientId, message) {

  var messageAttachments ;
  
  message.attachments? 
    messageAttachments=message.attachments:
    messageAttachments=message.attachment;

  // var messageAttachments = messageAttachments[0];
  
  var messageAttachments = {
    type: messageAttachments.type,
      payload: {
        url: messageAttachments.payload.url
      }
      };

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: { 
      attachment: JSON.stringify(messageAttachments) 
    }
  };







/* EXPECTED FORMAT */
/*
'
{
  "recipient":{
    "id":"USER_ID"
  },
  "message":{
    "attachment":{
      "type":"image",
      "payload":{
        "url":"https://petersapparel.com/img/shirt.png"
      }
    }
  }
}
'
*/

 callSendAPI(messageData);            

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

function sendGenericMessage(recipientId, url) {
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
            subtitle: url,
            item_url: url,               
            image_url: url,
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






/*

if (messageAttachments.type="audio")
{

//  console.log(JSON.stringify(messageAttachments[0].payload.url)); 
  
  var audio = messageAttachments[0].payload.url; 
  speechClient.recognize(''+audio, {
  encoding: 'LINEAR16',
  sampleRate: 16000

}, function(err, transcript) {
  console.log(transcript);
  console.log(err);

});


}

**/






if (messageText){

    var document = languageClient.document(messageText);
    document.detectSentiment(function(err, sentiment) { 
  
    var score = JSON.stringify(sentiment.score);          
    var magnitude = JSON.stringify(sentiment.magnitude);  

    console.log("Score = " + score + " | Magnitude = " + magnitude);


});

}



  




  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        mgiphy.get(request, messageText, 25, function(url){
          
          console.log(JSON.stringify(messageText));            

            var url = url;                                               
            var message1 = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":url }}};

            sendMediaMessage(senderID, message1);         // ASYNC       

        });
        
             var message2 = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":"https://chatzer.herokuapp.com/logo.png" }}};
            sendMediaMessage(senderID, message2);

        
        var reqs = app.textRequest(messageText, {
        sessionId: senderID
});


 /**
  * 

   result:
   { source: 'agent',
     resolvedQuery: 'hi',
     action: 'send_self_id',
      actionIncomplete: false,
      parameters: { greetings: 'Hello, there!' },
     contexts: [],
     metadata:
      { intentId: 'e3a3186e-3edd-4cf7-a72e-6cc649c3afc3',
        webhookUsed: 'false',
        webhookForSlotFillingUsed: 'false',
        intentName: 'greet_user' },
     fulfillment: { 
        speech: 'Hello!', 
        messages: {
          "title":"Chatzer!",
          "subtitle":"",
          "imageUrl":"https://fb-s-d-a.akamaihd.net/h-ak-xfp1/v/t1.0-9/17191310_1886318901589735_6240676010806644895_n.png?oh=a43f0c821833b413be3589ae32f4cb17&oe=59698AD9&__gda__=1499001758_2de2bfd6b78c206cdc14e4b233094bef",
          "buttons":[],"type":1} 
    },
     
     score: 1 },
  status: { code: 200, errorType: 'success' },
   sessionId: '1450043748391296' }



  */

  // =====================================
  //   HANDLE THE RESPONSE FROM API.AI 
  // =====================================

reqs.on('response', function(response) {
var mediaObj; 
if (response.result.fulfillment.messages){
  mediaObj = response.result.fulfillment.messages[1]; 
}
var textObj = response.result.fulfillment.speech; 

console.log("=======");
console.log(response); 
console.log(mediaObj);

sendTextMessage(senderID, textObj);
mediaObj? sendMediaMessage(senderID, mediaObj.payload.facebook):console.log("no attachments");  
// API.AI orginating media message (from user)


});
 
reqs.on('error', function(error) {
    console.log(error);
});
 
reqs.end();

    }



  } 


  else if (messageAttachments) { 




    // THIS always matches to TRUE which is insane!!!?

    if (messageAttachments[0].type=="image")     // STILL matches to true?
  {

// =================================================
// |    STARTS A SELFIE GAME > INTENT = SELFIE     |
// =================================================

  // must find a way to catch exception if KAIROS do not work \
  // as the API is much more limited than Google's)


      console.log("IMAGE RECEIVED!");

      var faceinfo; 
      var image = messageAttachments[0].payload.url;

      // =================
      //   GOOGLE VISION
      // =================
        // === ASYNC + Callback after fullfillment = HEAVEN! <3  ===    
        mvision.detect(senderID, timeOfMessage, fs, request, visionClient, image, 
          function(values){        
            faces=values;

            // Handle an exception where no faces are detected in image! 
            // Send faceinfo to user for DEBUG!          
            faces? faces.forEach((face, i) => {
              sendTextMessage(senderID, JSON.stringify(face));
            }):sendTextMessage(senderID, "no faces detected!");});
            
            // INTENT:CONTEXT = SELFIE 

      // =================
      //      KAIROS
      // =================
        mkairos.detect(senderID, timeOfMessage, fs, request, image, 
          function(values){        
            faces=values;

            // GUESS AGE/GENDER/GLASSES 
           console.log(JSON.stringify(faces));

          });



/*
        mkairos.media(senderID, timeOfMessage, fs, request, image, 
          function(values){        
            faces=values;

            // Handle an exception where no faces are detected in image! 
            // Send faceinfo to user for DEBUG!          
            // faces? faces.forEach((face, i) => {sendTextMessage(senderID, JSON.stringify(face))})
           // :sendTextMessage(senderID, "no faces detected!");

           console.log(faces);
           console.log(JSON.stringify(faces));

          });

*/        
        }
        else if (messageAttachments[0].type=="audio"){                          
          
            

 /**
  *
  var audio = messageAttachments[0].payload.url;           
  maudio.transcribe(senderID, timeOfMessage, fs, request, speechClient, audio,         
            function(transcript){
                 console.log(transcript);
          });

  */
          


        }

        

    // messenger orginating media message (from user)
    // sendMediaMessage(senderID, message); 
    // send the media message to the appropriate HANDLER (AI or Face recognition, etc.)

  } 


}




self.app.post('/ai', function(req, res) {
  
  /** VERIFICATION CODE = DONE! **/
/*
           if (request.query['hub.mode'] === 'subscribe' &&
      request.query['hub.verify_token'] === 'chatzer') {
    console.log("Validating webhook");
    response.status(200).send(request.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    response.send(403);          
  }
*/   

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




});




    };

    self.initialize = function() {
        self.initializeServer();		
    };
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.app.get('port'), function() {
            console.log('Node app is running on port', self.app.get('port'));
        });
    };


};


var chatzer = new App();
chatzer.initialize();
chatzer.start();