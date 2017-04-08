
// ORIGINAL 

        mgiphy.get(request, messageText, 25, function(url){
          
            console.log(JSON.stringify(messageText));            

            var url = url;                                               
            var message = {
                    "attachment": {
                    "type": "image",
                    "payload": {
                    "url":url }}};

              console.log(message);

            sendMediaMessage(senderID, message);
        });



 type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",


