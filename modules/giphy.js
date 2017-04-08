
module.exports = {
    returnData:function(data){
        return data;                // one GIPHY
    },

    get:function(request, keywords, limit, callback){        
        var keywords = encodeURIComponent(keywords);        
        var options = {
                url: 'http://api.giphy.com/v1/gifs/search?q='+keywords+'&api_key=dc6zaTOxFJmzC&limit='+limit+'&offset=0',
                method: 'GET' }; 

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {  

                var choice = Math.floor(Math.random() * (limit-1));          // + 0 (from zero to limit)
                            
                var obj = body ;             
                var data = obj;                          // ... returned JSON - unparsed? 
                
                var stringConstructor = "test".constructor;
                var arrayConstructor = [].constructor;
                var objectConstructor = {}.constructor;

                console.log("=========== GIPHY LOGGER! ==========");
               // if (data.constructor===stringConstructor){  console.log("STRING!"); }
               // else if (data.constructor===arrayConstructor){ console.log("ARRAY!"); }
               // else if (data.constructor===objectConstructor){console.log("OBJECT!"); }
                
              // console.log(JSON.stringify(object.data[choice]));

              console.log(choice);
              
                var url; 
                
                var object = JSON.parse(data);      // PERFORMANCE WARNING: That took 2 seconds!                       
                
                object.data[choice].images.fixed_width.url? 
                    url = object.data[choice].images.fixed_width.url:console.log("GIPHY NOT FOUND!");; 

                callback(module.exports.returnData(url));

        }
    });




    }



}; 