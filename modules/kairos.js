
// use 'detect' to guess "AGE/GENDER/GLASSES"

module.exports = {
    headers:{
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded',
            'app_id': 'b1592ea1',
            'app_key': 'ddfb3317a291a021d1ee240b54f517cf' },

    returnData:function(data){

        // console.log("=== RETURN DATA ===");
       //  console.log(JSON.stringify(data)); 
     // console.log(data.length+"faces detected...");

        return data;

    },

    detect:function(senderID, timeOfMessage, fs, request, image, callback){

          var download = function(uri, filename, callback){
        
            request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(
                fs.createWriteStream(filename)).on('close', callback);
        });
            };

;
            download(image, './static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg', 
                function(){            
                    var image_path = './static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg';                
                    // var uri = encodeURIComponent();     

            options = {
                url: 'https://api.kairos.com/detect',
                method: 'POST',
                json: {
                    "image":"http://chatzer.herokuapp.com/"+senderID+"_"+timeOfMessage+"_kairos.jpg",
                    "selector":"ROLL" },                    
                headers: module.exports.headers 
            }; 


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {                
                callback(module.exports.returnData(body));
        }
    });

            });
            
        
    },



// ==========
//   MEDIA 
// ==========
        media:function(senderID, timeOfMessage, fs, request, image, callback){

          var download = function(uri, filename, callback){
        
            request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(
                fs.createWriteStream(filename)).on('close', callback);
        });
            };


            download(image, './static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg', 
                function(){            
                    var image_path = './static/'+''+senderID+'_'+timeOfMessage+'_kairos.jpg';                
                    var uri = encodeURIComponent("https://chatzer.herokuapp.com/"+senderID+"_"+timeOfMessage+"_kairos.jpg");

            options = {
                url: 'https://api.kairos.com/v2/media?source='+uri,
                method: 'POST',        
                headers: module.exports.headers 
            }; 


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {                
                callback(module.exports.returnData(body));
        }
    });

            });
            
        
    }

    
    





}