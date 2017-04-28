
/*
 * =============================================  TASK LIST | DUE 20/4/2017  ===================================================
 *     0- GETSTARTED introductory button for explaining the UX in not-so-boring detail!  = DONE! 


 *     1- create and integrate mongoDB database for entries/user information.            = DONE! 
 *     2- create selfie game rules and responses.
 *     3- create multimedia interactions rules and responses.                            = DONE! 
 *  																				     = DONE!
 * 
 *     4- create emotional responses ONLY on an entire log entry and store the current emotions in DB with entry. 
 *          - get TONE analysis / personality / emotions and sentiment in a formula to produce a response | and store! 
 *          - react to emotion with multimedia too. 
 * 
 *     5- create contextually relevant messengerAPI related features (look at paper).		= DONE!
 *     6- handling emojis + emoji sentiment? (outside diary context/ inside diary context).  = DONE!
 * 
 *     7- create animated visual response (animating GIF for CHATZER EYE) | In response to what though?
 * 
 *          < CREATIVE NOTE TAKING >
 *  		 		< FIX THE FACT THAT A CAROUSELL CAN ONLY CATCH 10 ELEMENTS >
 * 			        < USER MAY HAVE A KAJILLION NOTES - HOW TO VIEW IN A CAROUSELL STILL - MULTIPLE ONES? > 
 
 *     8- Translating from any input language to ENGLISH back and forth between messenger/API.AI  < N/A > 
 *     9- putting a GIPHY in proper card showing the BANNER. 									  < N/A > 
 * 
 *    10- PUSH notifications after a long time of inactivity (push with what's your status or check the media out! ) < N/A > 
 * 
 * =============================================================================================================================


Carousel = 10 items 


DONE! 
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
 * 
 * 
 * ========
| TODO |
========

DONE!
-- Fix response if KAIROS API is DOWN ! 
-- Fix interpreting audio while listening ?
https://medium.muz.li/the-ultimate-guide-to-chatbots-why-th…
-3- Media response is relating to latest note emotion.

-0- Fix Audio feature - add something related to Audio entity recognition! 

< tell something > - get a definition!
-1- Mix and match emotions for better analysis (store all major emotions instead of only one major)
-- use that information to save user's mood (average - trend - graph?)
-- use a set of notes to detect user's personality (IBM natural tone analysis - personality - etc )
-2- More than 10 items per carousel. (a 'view more' carousel item)

- FUTURE -
-- CREATE a singalong game - where it suggests songs and shows a summary of lyrics to sing along! <3 
-4- Extract information/entities from the notes to better sympathize with the person's preferences. (watson NLU)
-- store these preferences to provide a customized experience. (mongoDB)
-- in time, an interaction profile is created for the specific user. (mongoDB)
-- in time, the application should use a machine learning model to improve and dynamically interpret user's intentions 
and also generate more responses and update (API.AI) intent model with those responses.



 */


