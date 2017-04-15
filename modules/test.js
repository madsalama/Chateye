
function getMedia(keywords, mediatype, mgiphy){

    var type; 
    var types = ['#giphy','#tweet','#youtube','#insta']; 
    var randType = types[Math.floor(Math.random() * (length(types)-1))];

    (mediatype ==='undefined')? type=randType: type=mediatype; 

    if (mediatype === '#giphy'){
            mgiphy.get(request, keywords, 15, function(url){
                    return url; 
            }));
    }

    if (mediatype === '#tweet'){
           
           return url; 
    }








    return media; 
}





























///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////



function receivedMessage(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  // CHECK POSTBACK 

  var postback; 
  if (event.postback){
    postback = event.postback.payload;
  }
  
// ===========================
//   HANDLING USER/SESSIONS
// ===========================

var lookup = getLookupSessions(users);

// If there's no object for that user... 
if (!lookup[senderID] || postback === "getStarted") {
  
   // get user information | store it 
   mgraph.getuser(request, senderID, function(results){    
     
     console.log("====== GETTING USER INFORMATION =======");    

      var first_name = results.first_name;
      var last_name = results.last_name; 
      var profile_pic = results.profile_pic;
      var gender = results.gender; 

   // create an object for the user...    
   users.push( { id:senderID, action:'', currentEntry:'',
                first_name:first_name, last_name:last_name, 
                profile_pic:profile_pic, gender:gender } );
    
    // HANDLE TODO: ONLY IF USER IS NOT IN DB
    mmongo.addUser(MongoClient, assert, db_url, 
    senderID, first_name, last_name, profile_pic, gender, function adduserCallback(result){
        console.log(result);
    }); 

    introduce(senderID);

   });

}
else { 
    
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
      case 'introduce':
          introduce();
        // sendGenericMessage(senderID);
        break;

      default:  
           console.log(getAction(senderID));                      
           api_ai(senderID, messageText, app);
    }
  } 


  else if (messageAttachments) { 
    if (messageAttachments[0].type=="image")     
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
              sendTextMessage(senderID, JSON.stringify(face), function(){});
            }):sendTextMessage(senderID, "no faces detected!", function(){});
          
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


           fs.unlink('./static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg');


           

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