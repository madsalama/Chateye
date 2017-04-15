
module.exports = {
    returnData:function(data){
        return data;                
    },

    headers:{
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded', 
        },







createGetStarted:function(request, callback){

        options = {    
                    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
                    method: 'POST',
                    headers:module.exports.headers,         
                    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
                    json:{
                        setting_type:"call_to_actions",
                        thread_state:"new_thread",
                        call_to_actions:[{ "payload":"getStarted"} ]
                    }
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



    getuser:function(request, senderID, callback){

    options = {    
            uri: 'https://graph.facebook.com/v2.8/'+senderID+'?fields=profile_pic,first_name,last_name,gender',
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