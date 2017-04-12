


// search users array for a user whose ID is senderID
        // when found, change the value of action on that user to action 

function setAction(senderID, actionValue) {
   for (var i in users) {
     if (users[i].id == senderID) {
        users[i].action = actionValue;
        break;             //Stop this loop, we found it!
     }
   }
}



