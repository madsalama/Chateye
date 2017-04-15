#!/bin/env node

// ========================================
//       Chatzer - A friendly AI
// ========================================
    
    // CHATZER SEES and sympathizes.
            // your text entries ... 
            // your photos | selfies ... 
            // your photos of a diary entry (handwritten) .... 

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
const express = require('express');
const compression = require('compression');
const fs      = require('fs');
const cors = require('cors');
const request = require('request');

const vision = require('@google-cloud/vision');
const visionClient = vision({
projectId: 'nlpi-162211',
keyFilename: './NLPI-c6ba16b1d273.json'
});


const mvision = require('./modules/vision');
const mkairos = require('./modules/kairos');
const mgiphy = require('./modules/giphy');
const maudio = require('./modules/audio');

const mgraph = require('./modules/graph');

const cloudconvert = new (require('cloudconvert'))('NWI7R-QImkho2Vp1HE_0jYU4SvzRoOKoFO2rniLiLZPI6JhmWmLdInskuhgzuigTas0F0zdmxqWqMx0iWHXG_A');

const bodyParser = require("body-parser");

const apiai = require('apiai');
const app = apiai("686ce1c23e2d49fb9036a728a6ec8b3f");

const mwatson = require('./modules/watsonNLU');
const watsonNLU = require('watson-developer-cloud/natural-language-understanding/v1.js');
const watsonNLUClient = new watsonNLU({
        'username': 'e1ca4da7-3cec-4720-9557-e6d211560e4a',
        'password': 're5ZyVptFvH7',
        'version_date': '2017-02-27' });

const watsonSpeech2text = require('watson-developer-cloud/speech-to-text/v1');
const speech2text = new watsonSpeech2text({
        'username': '747511eb-deb0-4294-a800-7f245665e62a',
        'password': 'mlunTdSmsGJU' });


// USER SESSION INFO | MEMORY
var users = [];             


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var db_url = 'mongodb://chatzer:chatzer2009@ds137760.mlab.com:37760/heroku_n6s5058w';


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



// ====================================
//     LOCAL START UP TESTS GO HERE 
// ====================================
// 
//
//
// ====================================

// add entry should take entryText (directly OR converted from an image) - then add it for a certain user. 
// var addEntry = function(db, entryText, userID, callback)

var addEntry = function(db, entryText, entryDate, entryAnalysis, userID, callback) {

   // Get the documents collection
  var collection = db.collection('entries');
  // Insert some documents
  collection.insertOne(

    // an indexed entryID '_id' is generated automatically...    
    { entryText: entryText, 
      entryDate: entryDate,
      entryAnalysis: entryAnalysis, 
      userID: userID }

  , function(err, result) {
    console.log("====== MONGO DB LOGGER ========= ");
    console.log("inserted a document/ entry into the collection!");

    callback(result);
    
  });

}

var getEntries = function(db, callback) {

  // Get the documents collection
  var collection = db.collection('entries');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records... ");
    console.log(docs)
    callback(docs);
  });

}


function connectAdd(){

MongoClient.connect(db_url, function(err, db) {
  assert.equal(null, err);

addEntry(db, '7amada','14/11/1991','sad as fuck' , 34563456356, function(result){
  console.log("ENTRY ADDED TO DB!");
  db.close(); 
});


});
};


connectAdd(); 


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

////////////////////////////////////////////////////////////


function checkObject(data){

                var stringConstructor = "test".constructor;
                var arrayConstructor = [].constructor;
                var objectConstructor = {}.constructor;

                
                if (data.constructor===stringConstructor){  console.log("STRING!"); }
                else if (data.constructor===arrayConstructor){ console.log("ARRAY!"); }
                else if (data.constructor===objectConstructor){console.log("OBJECT!"); }

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

function sendGiphy(request,messageText,limit, senderID)
{

  mgiphy.get(request, messageText, 25, function(url){
          
          console.log(JSON.stringify(messageText));            

            var url = url;    

            var message1 = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":url }}};

             var message2 = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":"https://chatzer.herokuapp.com/logo.png" }}};
            
            url?sendMediaMessage(senderID, message1):console.log("GIPHY NOT FOUND!");       
            url?sendTextMessage(senderID,'Powered by GIPHY'):console.log("==============");

        });

};



function resetContexts (app,senderID){

 var reqdel = app.deleteContextsRequest({ sessionId: senderID });
        reqdel.on('response', function(response) {
            console.log(response);
        }); 

        reqdel.on('error', function(error) {
        console.log(error); 
       
        });
 
        reqdel.end();


}




function api_ai(senderID, messageText, app){    
   
          var reqs = app.textRequest(messageText, {
          sessionId: senderID });
          
// =====================================
//   HANDLE THE RESPONSE FROM API.AI 
// =====================================

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


if (reqs){

  reqs.on('response', function(response) {

 if (response.result.action === 'listen'       | 
     response.result.action === 'save-entry'   | 
     response.result.action === 'get-media'    | 
     response.result.action === 'get-entries'  |
     response.result.action === 'play-selfie'    
     ){
  setAction(senderID, response.result.action); 
 }

if (response.result.action === 'save-entry') { 
  resetContexts(app, senderID);
  // call commit entry
};

if (response.result.action === 'get-media') { 

      // collect request information (names/media-types/etc)
      // formulate a query string with non empty info 

      // call get media with keywords 

};

if (response.result.action === 'get-entries') { 

};

if (response.result.action === 'play-selfie') {        
};


var mediaObj; 
if (response.result.fulfillment.messages){
  mediaObj = response.result.fulfillment.messages[1]; 
}

var textObj = response.result.fulfillment.speech; 
var textObj = response.result.fulfillment.speech; 

console.log("=======");
console.log(response); 
console.log(mediaObj);

textObj?  sendTextMessage(senderID, textObj):console.log("no response from API.AI");
mediaObj? sendMediaMessage(senderID, mediaObj.payload.facebook):console.log("no attachments");  

});  
 
reqs.on('error', function(error) {
    console.log(error);
});
 
reqs.end();

}




            


}       // API.AI END 


function setAction(senderID, actionValue) {
   for (var i in users) {
     if (users[i].id == senderID) {
        
        console.log("====== inside set action ======");   

        users[i].action = actionValue;
        console.log("users[i].action = " + users[i].action );

        break;          
     }
   }
}


function getAction(senderID) {
   for (var i in users) {
     if (users[i].id == senderID) {
        return users[i].action;         
     }
   }
}




function conCatEntry(senderID, value) {
   for (var i in users) {
     if (users[i].id == senderID) {
        users[i].currentEntry = users[i].currentEntry + " - " + value;
        break;            
     }
   }
}

function getEntry(senderID) {
   for (var i in users) {
     if (users[i].id == senderID) {
        return users[i].action;         
     }
   }
}

function commitEntry(senderID) {
   for (var i in users) {
     if (users[i].id == senderID) {

         // STORE users[i].currentEntry in a database 

     }
   }
}






function getLookupSessions(users){

var lookup = {};
for (var i = 0, len = users.length; i < len; i++) {
    lookup[users[i].id] = users[i];
};

return lookup;    /* 'lookup' object == { 'id1':object1, 'id2':object2, ... } */

}


function receivedMessage(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

// resetContexts(app, senderID); 


// ===========================
//   HANDLING USER/SESSIONS
// ===========================

// ASYNC HELL
// WHAT IF TWO RACING USER MESSAGES ARE RECEIVED AND THE FOR LOOP TAKES TIME....?

var lookup = getLookupSessions(users);

// If there's no object for that user... 
if (!lookup[senderID]) {
  
   // get user information | store it 
   mgraph.getuser(request, senderID, function(results){    
     
     console.log("====== USER INFORMATION =======");            
      var first_name = results.first_name;
      var last_name = results.last_name; 
      var profile_pic = results.profile_pic;
      var gender = results.gender; 

   // create an object for the user...    
   users.push( { id:senderID, action:'', currentEntry:'',
                first_name:first_name, last_name:last_name, 
                profile_pic:profile_pic, gender:gender } );

  console.log(users);

   }); 
}






  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;


  if (messageText) {

  mwatson.manalyze(watsonNLUClient, messageText, function(response){
    var response = response;
    console.log(response);
  });

    switch (messageText) {
      case 'introduce...':
        sendGenericMessage(senderID);
        break;

      default:  
           console.log(getAction(senderID));                      
           api_ai(senderID, messageText, app);
    }
  } 


  else if (messageAttachments) { 

    // THIS always matches to TRUE which is insane!!!?

    if (messageAttachments[0].type=="image")     // STILL matches to true?
  {


// if action is LISTEN - convert image text into text
// store text | send 'that's all' to API.AI to finalize. 

// if action is SELFIE - do selfie game

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
            }):sendTextMessage(senderID, "no faces detected!");
          
      fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.jpg');

      });
            
            // INTENT:CONTEXT = SELFIE 

      // =================
      //      KAIROS
      // =================
        mkairos.detect(senderID, timeOfMessage, fs, request, image, 
          function(values){        
            faces = values;

            // GUESS AGE/GENDER/GLASSES             
           console.log("========= KAIROS DETECT =========");
           console.log(JSON.stringify(faces));

                  mkairos.media(senderID, timeOfMessage, fs, request, image, 
                  function(values){        
                    faces = values;

                  // GUESS EMOTION
                  console.log("========= KAIROS MEDIA =========");
                  console.log(faces);
                  console.log(JSON.stringify(faces));

                  fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg');

                  });

           

          });

                 






        }



        else if (messageAttachments[0].type=="audio"){                          

  var audio = messageAttachments[0].payload.url;    
  maudio.transcribe(senderID, timeOfMessage, fs, request, audio, speech2text, cloudconvert,     
            function(result){              
              
                var mresult = JSON.parse(result);

                console.log(mresult);
                console.log(mresult.results[0]);
                console.log(mresult.results[0].alternatives[0]);
                console.log(mresult.results[0].alternatives[0].transcript);


                var transcript = JSON.stringify(mresult.results[0].alternatives[0].transcript) ;

                sendTextMessage(senderID, "I heard you say: " + transcript);
                api_ai(senderID, transcript, app);

              // Remove transcribed audio files 
               fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.mp4') ;
               fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.wav') ;



          });

        } ///// 


        

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