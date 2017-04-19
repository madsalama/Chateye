
/*
 * =============================================  TASK LIST | DUE 20/4/2017  ===================================================
  
      // ============================================
     //      THESE SHOULD MAP TO FOUR FUNCTIONS
    // ==============================================
            //   response.result.action === 'listen'            // concatenate text into a block of text (users[] based)
            //   response.result.action === 'save-entry'        // commit block of text to DATABASE
            //   response.result.action === 'get-media'         // call GET MEDIA FUNCTION 
            //   response.result.action === 'get-entries'       // load recent entries from DB into a UI Carousell 
            //   response.result.action === 'play-selfie'       // start selfie game (call selfie function)




 *     0- GETSTARTED introductory button for explaining the UX in not-so-boring detail!  = DONE! 
 * 
 
 * = ADD PERSISTENT MENU = * 
 *  * SEND MESSAGE *
 *  * MENU = 
 		* <EMOJI ICON> Listen/Take note*
 		* <EMOJI ICON> Show Notes *
 		* <EMOJI ICON> SELFIE! *
		* <EMOJI ICON> About *
 
 *  
 * 
 * curl -X DELETE -H "Content-Type: application/json" -d '{
  "fields":[
    "persistent_menu"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD"


curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD"



 *     1- create and integrate mongoDB database for entries/user information.            = DONE! 
 *     2- create selfie game rules and responses.
 *     3- create multimedia interactions rules and responses.                            = WIP! 
 * 
 * 
 * 
 * 
 *          < CREATIVE NOTE TAKING >
 *  		 		< FIX THE FACT THAT A CAROUSELL CAN ONLY CATCH 10 ELEMENTS >
 * 			        < USER MAY HAVE A KAJILLION NOTES - HOW TO VIEW IN A CAROUSELL STILL - MULTIPLE ONES? > 
 * 
 * 
 * 
 * 																						 = WIP!
 *     4- create emotional responses ONLY on an entire log entry and store the current emotions in DB with entry. 
 *          - get TONE analysis / personality / emotions and sentiment in a formula to produce a response | and store! 
 *          - react to emotion with multimedia too. 
 * 
 *     5- create contextually relevant messengerAPI related features (look at paper).
 * 
 *     6- handling emojis + emoji sentiment? (outside diary context/ inside diary context). 
 * 
 *     7- create animated visual response (animating GIF for CHATZER EYE) | In response to what though?
 * 
 *     8- translating from any input language to ENGLISH back and forth between messenger/API.AI 
 * 
 *     9- putting a GIPHY in proper card showing the BANNER. 
 *    10- PUSH notifications after a long time of inactivity (push with what's your status or check the media out! )
 * 
 * =============================================================================================================================
 */

/**   ========================= DATA DESIGN - TWO COLLECTIONS ================================
 * 
 * 
 * 	< users > 
		user
			- userid
			- userSession 
				
			- userCurrentEmotionalStatus
			- userPreviousEmotionalStatus 
			
			- userPreviousEntry: entryID 		
			- userCurrentEntry: entryID
			
			- userPreferences:
				- movies -> actors
				- music -> musician
				
	< entries > 
		- entry - 
			- entryID = userID_sessionID			// index here for speed 
			- entryText 
			- entryAnalysis 
					- anger
					- sadness
					- disgust 
					- joy							

> db.person.findOne()
{
  name: 'Mahmoud Salama',
  userID: '79384759384705',
  entries : [

  ]

     users.push( { id:senderID, action:'', currentEntry:'',
                first_name:first_name, last_name:last_name, 
                profile_pic:profile_pic, gender:gender } );

				
  
  
 * 
 * 
 */