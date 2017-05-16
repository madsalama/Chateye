
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
                   // proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'

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
             composer_input_disabled:false,

            call_to_actions: [{

          title:"☰ Menu",
          type:"nested",
          call_to_actions:[
                    {
                type:"postback",
                title:"🤐 Listen To Me | Take Note",
                payload:"listen"
                   },
            
                   {   
                type:"postback",
                title:"📓 Done Talking | Memorize",
                payload:"stop"
                   }, 

                {
                type:"postback",
                title:"📓 Show Notes",
                payload:"show"
            },           
            {
                type:"postback",
                title:"📷 Selfie Game!",
                payload:"selfie"
            },
            {
                type:"postback",
                title:"😎 Random Media!",
                payload:"random"
            }

          ]}]
             }]
        }; 

        var options = {
                    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
                    method: 'POST',                           
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
                    json: message
                   // proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'

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
                   // proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'
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
                    // proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'

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
            // ,proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'
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



},


    whitelist:function(request, callback){

    options = {    
            uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
            method: 'POST',                        
            qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
            json: {
                setting_type : "domain_whitelisting",
                whitelisted_domains : ["https://chatzer.herokuapp.com"],
                domain_action_type: "add"
}
// proxy: 'http://proxy:9954c1da29e3-4792-865b-96f4e4004f0d@proxy-54-235-72-96.proximo.io'
    }; 


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {     
               // var data = JSON.parse(body);            
               callback(module.exports.returnData(body));               
        }
        else
        {
            callback(module.exports.returnData(body));        
        }
    });



}









};