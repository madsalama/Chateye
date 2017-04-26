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
const mmongo = require('./modules/mongo');
const myoutube = require('./modules/youtube');



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

var namer = require('color-namer');

// USER SESSION INFO | MEMORY
var users = [];             


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

// Connection URL
var db_url = 'mongodb://chatzer:chatzer2009@ds137760.mlab.com:37760/heroku_n6s5058w';


var App = function() {

    var self = this; 

    self.initializeServer = function() {
		
		self.app = express();
    self.app.use(express.static('static'));

     proxy = url.parse(process.env.PROXIMO_URL); 
     hostname = proxy.hostname; 
     port = proxy.port || 80 ; 

        self.app.set('hostname', hostname); 
        self.app.set('port', port);
     
        self.app.use(compression()); 
        self.app.use(cors());
     

        self.app.use(bodyParser.urlencoded({ extended: false }));
		    self.app.use(bodyParser.json());


// SETUP MESSENGER PROFILE 


mgraph.whitelist(request, function(){
  mgraph.createGetStarted(request, function(result){
    console.log(result);
    mgraph.createMenu(request, function(result){
          console.log(result);
          mgraph.getMenu(request, function(result){
                console.log(result);
          });          
});
});
});




// ====================================
//     LOCAL START UP TESTS GO HERE 
// ====================================





// ====================================

 

function callSendAPI(messageData, callback) {
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

      callback();

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

function formulateKeywords(){
  var str = ''; 

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] != undefined && arguments[i] !== ''){
        str = str+' '+arguments[i];
    }



  }

return str; 
}


 function MaxCat(emotions){
    var highest = 0;
    var arr = [];
    for (var prop in emotions) {
        if( emotions.hasOwnProperty( prop ) ) {
            if(emotions[prop] > highest && emotions[prop]>0){ 
                arr = [];
                highest = emotions[prop];
                arr[prop] = highest;
            }

        } 
    }
    return arr;
}



function sendMediaMessage(recipientId, message, callback) {

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



 callSendAPI(messageData, callback);            

}

function sendTextMessage(recipientId, messageText, callback) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData, callback);

}


function sendQuickReplies(recipientId, callback) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Pick one!",

      "quick_replies":[
      {
        "content_type":"text",
        "title":"🤳 Selfie Opinion!",
        "payload":"describeSelfie"
      },
      {
        "content_type":"text",
        "title":"🤔 Guess Age!",
        "payload":"guessAge"
      }
    ]

    }
  };

  callSendAPI(messageData, callback);

}






function introduce(senderID, username){

    sendTextMessage(senderID, "Hello, "+ username + "!"+" I am your emotionally interactive, note-logging, media-suggesting AI.", function(){  
    sendTextMessage(senderID, "Please, tap the menu below to uncover all of my abilities!", function(){});
/*
    sendTextMessage(senderID, "I'll 'listen' to you if you 'want to talk'. Send your note as text, an audio message or \
even a photo of a something handwritten!", function(){
    sendTextMessage(senderID, "I can send you random songs, videos, gifs if you'd like, or we can play \
'the selfie game'! Ask me anything, anyway you like it! :P ", function(){});

});  // 2
*/



}); // 1 

}

function sendCard(recipientId, title, subtitle, imageurl, url, callback){

 var elements = [{
              title: title,
              subtitle: subtitle,
              image_url: imageurl,
              item_url: url 
              
}]; 

  var messageData = {
    recipient: {
      id: recipientId
    },

    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          sharable:true,
          elements:elements
        }
      }
    }
  }; 

  callSendAPI(messageData, callback);



};

function sendNotes(recipientId, entries, callback) {
  
  var elements = []; 
  var n = 1;

   for (var i in entries) {

   

if (n<=10){

     var text = entries[(entries.length-1)-i].entryText ; 
     var analysis = entries[(entries.length-1)-i].entryAnalysis;
     var entryDate = entries[(entries.length-1)-i].entryDate;
     var id = entries[(entries.length-1)-i]._id; 

elements.push( 
  {
            title: "Note #" + n + " | " + "Mood: " + analysis,            
            subtitle: entryDate,
            // image_url: "",    // image defined according to note mood 
            "buttons":[
              { type:"postback",
                title: "Read", 
                payload:"read_"+text
              },

              { type:"postback",
                title: "Delete", 
                payload:"delete_"+id
              },              
              ]                                     // DEFINE POSTBACK - GIVE ENTRY TEXT - SEND TEXT MESSAGE 
  }
  );

  n++ ;

}


   }


  var messageData = {
    recipient: {
      id: recipientId
    },

    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements:elements
        }
      }
    }
  };  

  if(elements.length > 0){
  sendTextMessage(recipientId, "Gladly! Here are your recent entries...", function(){
        callSendAPI(messageData, callback);
  });
}
else {
  sendTextMessage(recipientId, "Apologies, but no notes were found!", function(){});
}

  

}

function sendGiphy(request,messageText,limit, senderID)
{

  mgiphy.get(request, messageText, limit, function(url){
          
          console.log(JSON.stringify(messageText));            

            var url = url;    

            var message1 = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":url }}};
  

            // sendCard(senderID, title, "Hope you like this!", imageurl, url, function(){})


            /*
              url?sendCard(senderID, "Powered by GIPHY", "Hope you like this!", url, url, function(){
                url?sendTextMessage(senderID,'Powered by GIPHY', function(){}):console.log(" ============== ");
              }):sendTextMessage(senderID, "bummer... can't seem to find anything relevant! :(", function(){});;  
            */
           // url = 'https://media1.giphy.com/media/b9pK1N3lrYkCc/giphy.gif' ; 
           // sendTextMessage(senderID,url, function(){}); 

           // sendCard(senderID, "Powered by GIPHY", "Hope you like this!", url, url, function(){});
           
            url?sendMediaMessage(senderID, message1, function(){              
              url?sendTextMessage(senderID,'Powered by GIPHY', function(){}):console.log(" ============== ");
            })
            :sendTextMessage(senderID, "bummer... can't seem to find anything relevant! :(", function(){});
            

        });

};



function resetContexts (app, senderID, context, callback){

    var headers = {
            'Accept':       'application/json',
            'Content-Type':     'application/json',
            'Authorization': 'Bearer 686ce1c23e2d49fb9036a728a6ec8b3f' };

   
   var options = {
                url: "https://api.api.ai/v1/contexts/"+context+"?sessionId="+senderID,
                method: 'DELETE',
                headers: headers
            }; 

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
              console.log(JSON.parse(body));
              callback();
         }

         else{
           console.log(JSON.parse(error));
         }
      });
 
 

/*
 var reqdel = app.deleteContextsRequest({ sessionId: senderID }, context );

     reqdel.on('response', function(response) {
            console.log(response); 
        }); 

        reqdel.on('error', function(error) {
        console.log(error); 
       
        });

        reqdel.end();

   */     

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
     response.result.action === 'listening'    |
     response.result.action === 'save-entry'   | 
     response.result.action === 'get-media'    | 
     response.result.action === 'get-entries'  |
     response.result.action === 'play-selfie'  
     ){
  setAction(senderID, response.result.action); 

  if (response.result.action === 'listening'){

      conCatEntry(senderID, messageText); 
 
 }


 }







// ==== GET ENTRIES | SEND TO USER IN A CAROUSELL =====
// carousell item = entryDate, overallEmotion, image specifies color coded emotional state
      // tap item? postback is a message with the entry content!

if (response.result.action === 'get-entries'){
    mmongo.getUserEntries(MongoClient, assert, db_url, senderID, function(user_entries){         
     
     sendNotes(senderID, user_entries, function(){});
     console.log(user_entries);

    });
}



if (response.result.action === 'save-entry') { 

  resetContexts(app, senderID, 'listening', function(){
  });

var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

var minutes = today.getMinutes() ; 
// var seconds = today.getSeconds() ; 
var hours = today.getHours() ;
var period;

var weekday = new Array(7);
weekday[0] =  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

var day = weekday[today.getDay()];


if ( minutes < 10 ){
  minutes="0"+minutes ;
};

/*
if ( seconds < 10 ){
  seconds="0"+seconds ; 
};
*/

var time;
var dateTime;

mmongo.getUserLocale(MongoClient, assert, db_url, senderID, function(timezone){
  
  var timezone = parseInt(timezone); 

  hours=hours+timezone;
  
  if (hours>=13){ 
    hours=hours-12;
    period="PM"; 
  }
  else {
    period="AM"; }

  time = hours + ":" + minutes; // + ":" ; // + seconds;
  dateTime = day + " " + date+' at '+time + ' ' + period;
     
var entry = getEntry(senderID);

// ================ EMOTIONAL ANALYSIS OF THE NOTE =================

// only save entry when it is not empty 
if (entry !== ""){

  mwatson.manalyze(watsonNLUClient, entry, function(response){
    var response = response;
    var analysis; 

    var emotion = []; 
    var emotions; 
    var label ; 

    // FORMAT: Note#2 | Note mood:+Joy || Note#2 | Note mood:-Anger || Note#2 | Note mood:-Fear
    // Get LABEL of maximum value 
      
    response? emotions = response.emotion.document.emotion : console.log("N/A");; 
    emotion = MaxCat(emotions);                 // get maximum VALUE in EMOTIONS objects (KEY/VALUE) - [anger:0.3450]
    emotion = Object.keys(emotion);             // anger 

    // emotion = _.findKey(emotion[0], emotion );    // get KEY name matching MAX value 

    /* 
    "emotion": {
				"sadness": 0.137513,
				"joy": 0.000069,
				"fear": 0.021313,
				"disgust": 0.163266,
				"anger": 0.766191
			}
    */


    console.log(JSON.stringify(response));

    if (response){

        // for i in 
        // response.emotion.document.emotion

        if (response.sentiment.document.label === 'positive'){
          label = '+ve/' + emotion ;
        } else if (response.sentiment.document.label === 'negative'){
          label = '-ve/' + emotion;
        }
        else {
            label = 'meh/' + emotion;
        }

      analysis = label ; 

    }
    else {
      analysis = 'N/A'; 
    }
    

  mmongo.commitEntry(MongoClient, assert, db_url, 
entry, dateTime, analysis, senderID, 
  function commitCallBack(result){
    clearEntry(senderID);
    console.log(result);

}); 
});

}
else
{
api_ai(senderID,'i said nothing', app);
}


// ==================================================================




});





};

if (response.result.action === 'get-media') { 

       var media_types = response.result.parameters.media_type; 
       var media_type = media_types[Math.floor(Math.random() * (media_types.length-1))];

// =======================================================================================================
       
       var adjectives = response.result.parameters.adjective;
       var adjective  = adjectives[Math.floor(Math.random() * (adjectives.length-1))];
       // console.log(adjective + " | ");

       var given_names = response.result.parameters.given_name;
       var given_name  = given_names[Math.floor(Math.random() * (given_names.length-1))];
       // console.log(given_name + " | ");

       var last_names = response.result.parameters.last_name;
       var last_name = last_names[Math.floor(Math.random() * (last_names.length-1))];
       // console.log(last_name + " | ");

       var music_artists = response.result.parameters.music_artist;
       var music_artist = music_artists[Math.floor(Math.random() * (music_artists.length-1))];
       // console.log(music_artist + " | ");

       var animals = response.result.parameters.animal;
       var animal = animals[Math.floor(Math.random() * (animals.length-1))];
       // console.log(animal+ " | ");

       var genres = response.result.parameters.music_genre;
       var genre = genres[Math.floor(Math.random() * (genres.length-1))];
       // console.log(animal+ " | ");
       if ( genre === 'J-pop' ) {
        genre = "jpop" ; 
       }else if (genre === 'K-pop') {
          genre = "kpop" ; 
       }



// ======================================================================================================    

var keywords = formulateKeywords(adjective, given_name, last_name, music_artist, animal, genre);

console.log(" ========= KEY WORDS LOGGER ========= ");

console.log(keywords);

if (keywords === undefined || keywords === ""){
  keywords = response.result.resolvedQuery;
}

console.log(keywords);

switch(media_type) {
    case "#video":
    sendTextMessage(senderID, "OK! Now searching for something cool... 🤔", function(){

           // =========================================================
            myoutube.getVideo(request, keywords, 30, function(data){ 

                var url; 
                var videoId; 
                var imageurl; 

                data? videoId = data.id.videoId:console.log("VIDEO NOT FOUND!");                                 
                videoId?url = "https://www.youtube.com/watch?v="+videoId:console.log("");
                url?imageurl=data.snippet.thumbnails.medium.url:console.log(" "); 
                url? title = data.snippet.title:console.log(" ");

                console.log("IMAGE URL = " + JSON.stringify(imageurl)); 
                console.log("VIDEO TITLE = " + JSON.stringify(title));

                // sendCard(senderID, title, "Hope you like this!", imageurl, url, function(){});

                console.log("======= VIDEO =======");
                console.log(data);

                url?sendCard(senderID, title, "Hope you like this!", imageurl, url, function(){
                    // sendTextMessage(senderID, url, function(){});
                })
                :sendTextMessage(senderID, "bummer... nothing relevant was found! :(", function(){});
  

                /*

                url?sendTextMessage(senderID, url, function(){})
                :sendTextMessage(senderID, "bummer... can't seem to find anything relevant! :(", function(){});
                */


            });
            
                }); 
 
            // ==========================================================            
        break;

    case "#giphy":   
    sendTextMessage(senderID, "OK! Now searching for something cool... 🤔", function(){
    sendGiphy(request,keywords,20, senderID);
    });   

        break;

    default:
}





      // call get media with keywords 

};

if (response.result.action === 'get-entries') { 

// query DB for aa user entries
// show up in a carousell 


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

textObj?  sendTextMessage(senderID, textObj, function(){}):console.log("no response from API.AI");
mediaObj? sendMediaMessage(senderID, mediaObj.payload.facebook, function(){}):console.log("no attachments");  

});  
 
reqs.on('error', function(error) {
    console.log(error);
});
 
reqs.end();

}




            


}       // API.AI END 



function setAttribute(senderID, name, value) {

   for (var i in users) {
     if (users[i].id == senderID) { 

       if (name === 'selfieInfo.age')
        {users[i].selfieInfo.age = value;}
        else if (name === 'selfieInfo.glasses')
        {users[i].selfieInfo.glasses = value;}
        else if (name === 'selfieInfo.gender')
        {users[i].selfieInfo.gender = value;}
        else if (name === 'selfieInfo.color')
        {users[i].selfieInfo.color = value;}

        else if (name === 'selfieInfo.nfaces'){
          users[i].selfieInfo.nfaces = value ; 
        }

         else if (name === 'selfieInfo.emotion'){
          users[i].selfieInfo.emotion = value ; 
        }

        break;          
     }
   }
}


function getAttribute(senderID, name) {

   for (var i in users) {
     if (users[i].id == senderID) { 

       if (name === 'selfieInfo.age')
        {return users[i].selfieInfo.age ; }
        else if (name === 'selfieInfo.glasses')
        {return users[i].selfieInfo.glasses;}
        else if (name === 'selfieInfo.gender')
        {return users[i].selfieInfo.gender;}
        else if (name === 'selfieInfo.color')
        {return users[i].selfieInfo.color;}

        else if (name === 'selfieInfo.nfaces'){
          return users[i].selfieInfo.nfaces; 
        }

        else if (name === 'selfieInfo.emotion'){
          return users[i].selfieInfo.emotion; 
        }

        break;          
     }
   }
}





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
     if (users[i].id === senderID) {
        users[i].currentEntry = users[i].currentEntry + " * " + value;
        break;            
     }
   }
}

function clearEntry(senderID){
   for (var i in users) {
     if (users[i].id === senderID) {
        users[i].currentEntry = "";
        break;            
     }
   }
}

function getEntry(senderID) {
   for (var i in users) {
     if (users[i].id === senderID) {
        return users[i].currentEntry;         
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

  // CHECK POSTBACK 

  var postback; 
  if (event.postback){
    postback = event.postback.payload;
    console.log(postback);
  }





// ===========================
//   HANDLING USER/SESSIONS
// ===========================

var lookup = getLookupSessions(users);

// if server restarted, and a user sends a message, 
// push a fresh session object for that user...

if (!lookup[senderID]){

   // create an object for the user...    
   users.push( { id:senderID, action:'', currentEntry:'' , 
   selfieInfo: {
      age: 0,
      gender: 'm',
      nfaces: 0,
      color: '',
      glasses: '',
      
      emotion: ''

   }
  
} );
   console.log("=== user information ===");
   console.log(users);

}

// If there's no object for that user... 
if (postback === "getStarted") {
  
   // get user information | store it 
   mgraph.getuser(request, senderID, function(results){    
     
     console.log("====== GETTING USER INFORMATION =======");    

      var first_name = results.first_name;
      var last_name = results.last_name; 
      var profile_pic = results.profile_pic;
      var gender = results.gender; 
      var locale = results.locale; 
      var timezone = results.timezone;

    // HANDLE TODO: ONLY IF USER IS NOT IN DB
    mmongo.addUser(MongoClient, assert, db_url, 
    senderID, first_name, last_name, profile_pic, gender, locale, timezone, function adduserCallback(result){
        console.log(result);
    }); 

    introduce(senderID, first_name);

   });



}


else if (postback !== undefined && postback.startsWith("read_")){
      var text = postback.substring(postback.indexOf("_") + 1);
      text = text.substring(text.indexOf("*") + 1);
      text = text.substring(text.indexOf(" ") + 1);
      sendTextMessage(senderID, '"'+text+'"', function(){}); 
}

else if (postback !== undefined && postback.startsWith("delete_")){
      var id = postback.substring(postback.indexOf("_") + 1);

      mmongo.deleteEntry(MongoClient, assert, ObjectId, db_url, senderID, id, function(results){
        // console.log(results);
        sendTextMessage(senderID,"...note deleted!", function(){});
      });     

}

// =========================
//   PERSISTENT MENU ITEMS 
// =========================

else if (postback !== undefined && postback.startsWith("listen")){
    resetContexts(app, senderID, 'listening', function(){
        api_ai(senderID,"listen to me", app); 
    }); 
}

else if (postback !== undefined && postback.startsWith("show")){
        resetContexts(app, senderID, 'listening', function(){
        api_ai(senderID,"show my notes", app); 
    }); 
}

else if (postback !== undefined && postback.startsWith("stop")){          
        
          var entry = getEntry(senderID);
          if (entry !==""){
                api_ai(senderID,"stop listening", app);
          }
          else
           {
             resetContexts(app, senderID, 'listening', function(){
             api_ai(senderID,"i said nothing", app);});             
           }
          
        
     //   resetContexts(app, senderID, 'listening', function(){
    // }); 

}

else if (postback !== undefined && postback.startsWith("selfie")){
         resetContexts(app, senderID, 'listening', function(){
         api_ai(senderID,"play the selfie game!", app); 
    });  
}

else if (postback !== undefined && postback.startsWith("random")){
         resetContexts(app, senderID, 'listening', function(){
        
        sendTextMessage(senderID, "Well, tell me what you're in the mood for! Any artist/genre/song/video/gif is possible :O !", function(){});
        // randomly choose between video/song/gif 
        // randomly choose an adjective (read from list on disk)
        
        // api_ai(senderID,"let's play the selfie game!", app); 

    });  


}


// ============================
//     SELFIE GAME BUTTONS  
// ============================

else if (message!== undefined && message.quick_reply !== undefined && message.quick_reply.payload === "describeSelfie" ){

  var color = getAttribute(senderID, "selfieInfo.color");
  var glasses = getAttribute(senderID, "selfieInfo.glasses");
  var nfaces = getAttribute(senderID, "selfieInfo.nfaces");
  var emotion = getAttribute(senderID, "selfieInfo.emotion");
  var emoji ; 

  if (emotion[0] === "" || emotion[0] === undefined ) {
    emoji = "🤔";
  }

  if (emotion[0] === "joy"){emoji = "😁";}
  if (emotion[0] === "sad"){emoji = "😞";}
  if (emotion[0] === "angry"){emoji = "😠";}
  if (emotion[0] === "surprise"){emoji = "😲";}
  if (emotion[0] === "covered") {emoji = "🙈";}
  if (emotion[0] === "headwear"){emoji = "🙉";}

  console.log(JSON.stringify(users)); 
 
  // ... also guess emotional state here! 

  sendTextMessage(senderID,"I think that " + color + " is a color that looks good on you! ;)" ,function(){
  
    if (glasses !== "" && glasses === "Eye"){
      sendTextMessage(senderID,"... also, I think these glasses look so cute!🤓 ", function(){          
      });
    }
    else if (glasses !== "" && glasses === "Sun"){
      sendTextMessage(senderID,"... also, wow! these are some cool shades! 😎", function(){
    });         
    }

    // MANY PEOPLE? 
    if (nfaces!=0) {
        sendTextMessage(senderID,"You guys look great! 😀👍", function(){            
        });
    }  
    
    sendTextMessage(senderID,"Emoji look-a-like: "+ emoji + "!", function(){});

  });


}

else if (message!== undefined && message.quick_reply !== undefined && message.quick_reply.payload === "guessAge" ){
  
  var age = getAttribute(senderID, "selfieInfo.age");

  if (age === "none"){
    sendTextMessage(senderID,"It was not clear - face the camera and send another one! :P ",function(){});  
  }

  else
  sendTextMessage(senderID,"Well, I think you look " + age +" ! :P",function(){});  

}




else { 

  console.log("Received message for user %d and page %d at %d with message:", 
  senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;


  if (messageText) {



    switch (messageText) {
      case 'introduce':
          introduce();
        // sendGenericMessage(senderID);
        break;

      case 'generic':
        // sendGenericMessage(senderID, function(){});
      default:  
           console.log(getAction(senderID));                      
           api_ai(senderID, messageText, app);
    }
  } 


  else if (messageAttachments) { 
    if (messageAttachments[0].type=="image")     
  {

// 
// var image_action = getAction(senderID);
// if (image_action === "listen") {
// 
//
//      'convert handwritten entry to text - commit it to DB' 
//      'send a 'that's it' text to API.AI
// 
// }
// else {
  // show buttons for selfie game
  // <selfie opinion> <guess-age> <>
// }


// =================================================
// |    STARTS A SELFIE GAME > INTENT = SELFIE     |
// =================================================

  // must find a way to catch exception if KAIROS do not work \
  // as the API is much more limited than Google's)

      // ONLY if action is set to selfie-game
      var action = getAction(senderID);
      console.log(action);

      if ( action === 'play-selfie'){        
        sendTextMessage(senderID, "now checking...", function(){});

      // =================
      //      KAIROS
      // =================
      
      var faceinfo; 
      var image = messageAttachments[0].payload.url;

        mkairos.detect(senderID, timeOfMessage, fs, request, image, 
          function(values){        
            faces = values;

            // GUESS AGE/GENDER/GLASSES             
           console.log("========= KAIROS DETECT =========");
           console.log(JSON.stringify(faces));

           
           // FIRST FACE ON THE RIGHT
           if (faces.images) {

             if (faces.images[0].faces.length>1) {
                setAttribute(senderID, "selfieInfo.nfaces", faces.images[0].faces.length);
             }
             else 
             {
               setAttribute(senderID, "selfieInfo.nfaces", 0);
             }
             

           		var age = faces.images[0].faces[0].attributes.age;
		          var gender = faces.images[0].faces[0].attributes.gender.type;
		          var glasses_type = faces.images[0].faces[0].attributes.glasses;   // "None", "eye", "sun"

               setAttribute(senderID, 'selfieInfo.age', age );
               setAttribute(senderID, 'selfieInfo.gender', gender );
               setAttribute(senderID, 'selfieInfo.glasses', glasses_type );

             


          mvision.detect(senderID, timeOfMessage, fs, request, visionClient, image, 
          function(faces){                    

            sendQuickReplies(senderID, function(){});

            // Handle an exception where no faces are detected in image! 
            // Send faceinfo to user for DEBUG! 

            console.log("========= VISION DETECT =========");
            faces? faces.forEach((face, i) => {              
               console.log(JSON.stringify(face));
            }):console.log("no faces detected!"); 

            // check if any of the faces is smiling - enable the smile flag - great smile :) !
            // none of the faces is smiling? 
              // "Show me that big smile though!"
              // "I think you are hiding a great smile though! ;)"

            // Check if any of the faces seem angry/sorrow - enable the negative flag 
            // Oh, you seem a little upset though. Cheer up!

            var face = faces[0];

            var emotions; 
            emotions = { "joy": face.joyLikelihood,                 
                         "sad": face.sorrowLikelihood, 
                         "angry": face.angerLikelihood,
                         "surprise": face.surpriseLikelihood,
                         "covered": face.underExposedLikelihood,
                         "headwear":face.headwearLikelihood }; 
          
          // get most probable emotion 
          emotion = MaxCat(emotions);                 // get maximum VALUE in EMOTIONS objects (KEY/VALUE) - anger:0.3450    
          emotion = Object.keys(emotion);            

          setAttribute(senderID, 'selfieInfo.emotion', emotion);


            mvision.getProminentColor(senderID, timeOfMessage, fs, request, visionClient, image, 
            function(result){

            console.log("RESULT IS " + result);

            var colornames = namer("#"+result);
            var name = colornames.html[0].name;

            setAttribute(senderID, 'selfieInfo.color', name );

             console.log(users);
             
            fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.jpg');
            fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg');

            });



          // var r;
          // var g;
          // var b;

          // var colornames = namer("rgb("+r+","+g+","+b+")");
          // var name = colornames.basic[0]; 

    });


           } else {


             sendTextMessage(senderID,"nah! you actually gotta 'face' the camera, and in good lighting! Send another one! :P ", function(){});  

             setAttribute(senderID, 'selfieInfo.age', "none" );
             setAttribute(senderID, 'selfieInfo.gender', "none" );
             setAttribute(senderID, 'selfieInfo.glasses', "none" );

            
           }




           
           
          });  

          

    



      }
      


      // =================
      //   GOOGLE VISION
      // =================

/*
        mvision.detect(senderID, timeOfMessage, fs, request, visionClient, image, 
          function(values){        
            faces=values;


            // Handle an exception where no faces are detected in image! 
            // Send faceinfo to user for DEBUG!          
            faces? faces.forEach((face, i) => {
              sendTextMessage(senderID, JSON.stringify(face), function(){});
            }):sendTextMessage(senderID, "no faces detected!", function(){});
          
      fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.jpg');

      });
*/

            // INTENT:CONTEXT = SELFIE 

            


          
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

                sendTextMessage(senderID, "I heard you say: " + transcript, function(){});
                api_ai(senderID, transcript, app);

              // Remove transcribed audio files 
               fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.mp4') ;
               fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'.wav') ;



          });

        } 
  } 
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
          receivedMessage(event);
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