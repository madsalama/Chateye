
module.exports = {
    returnData:function(data){
        return data;                
    },

createGetStarted:function(request, callback){

        var message = {
            setting_type: "call_to_actions",
            thread_state: "new_thread",
            call_to_actions: [{ payload:"getStarted" }]
        }; 

        var options = {
                    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
                    method: 'POST',                           
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
                    json: message

        };

                request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {                              
                    callback(module.exports.returnData(body));                    
                }
                else
                {
                    callback(module.exports.returnData(body));        
                }
            });

},


createMenu:function(request, callback){

        var message = {
            
           // setting_type: "call_to_actions",
           // thread_state: "existing_thread",

             persistent_menu:[{

             locale:"default",
             composer_input_disabled:true,

            call_to_actions: [{

          title:"MENU",
          type:"nested",
          call_to_actions:[
                    {
                type:"postback",
                title:"🎤 Listen | Take note",
                payload:"listen"
                },
                {
                type:"postback",
                title:"📓 Show Notes",
                payload:"show"
                },
                {
                type:"postback",
                title:"🤳 SELFIE!",
                payload:"selfie"
                },
                {
                type:"postback",
                title:"ℹ️ About",
                payload:"about"
                }

          ]}]
             }]
        }; 

        var options = {
                    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
                    method: 'POST',                           
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
                    json: message

        };

                request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {                              
                    callback(module.exports.returnData(body));                    
                }
                else
                {
                    callback(module.exports.returnData(body));        
                }
            });

},

getMenu:function(request, callback){

        var options = {
                    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?fields=persistent_menu',
                    method: 'GET',                           
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' }                
        };

                request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {                              
                    callback(module.exports.returnData(JSON.parse(body)));                    
                }
                else
                {
                   callback(module.exports.returnData(JSON.parse(body)));                    
                }
            });


},

deleteMenu:function(request, callback){

        var options = {
                    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?fields=persistent_menu',
                    method: 'DELETE',                           
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
                    json:{ "fields":["persistent_menu"] }

        };

                request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {                              
                    callback(module.exports.returnData(JSON.parse(body)));                    
                }
                else
                {
                   callback(module.exports.returnData(JSON.parse(body)));                    
                }
            });


},









    getuser:function(request, senderID, callback){

    options = {    
            uri: 'https://graph.facebook.com/v2.8/'+senderID+'?fields=profile_pic,first_name,last_name,gender,locale,timezone',
            method: 'GET',   
            headers:module.exports.headers,         
            qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' }
    }; 


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {     
               var data = JSON.parse(body);            
               callback(module.exports.returnData(data));               
        }
        else
        {
            callback(module.exports.returnData(body));        
        }
    });



}







};