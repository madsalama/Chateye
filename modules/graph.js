
module.exports = {
    returnData:function(data){
        return data;                
    },

    headers:{
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded', 
        },

    getLikes:function(request, userID, callback){

    options = {    
            uri: 'https://graph.facebook.com/v2.8/'+userID+'/friendlists',
            method: 'GET',   
            headers:module.exports.headers,         
            qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' }
    }; 


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {     

                console.log("=== GRAPH ===");  
                console.log(data);

                console.log("=== GRAPH ===");  
                console.log(JSON.parse(data));

                callback(module.exports.returnData(body));
        }
        else
        {
            callback(module.exports.returnData(body));        
        }
    });



    },






};