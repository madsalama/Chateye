
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

                var choice = Math.floor(Math.random() * limit);          // + 0 (from zero to limit)
                            
                var obj = body ;             
                var data = obj;                          // ... returned JSON - unparsed? 
                
                var stringConstructor = "test".constructor;
                var arrayConstructor = [].constructor;
                var objectConstructor = {}.constructor;

                console.log("=========== GIPHY LOGGER! ==========");
                if (data.constructor===stringConstructor){  console.log("STRING!"); }
                else if (data.constructor===arrayConstructor){ console.log("ARRAY!"); }
                else if (data.constructor===objectConstructor){console.log("OBJECT!"); }
                
                var object = JSON.parse(data);      // PERFORMANCE WARNING: That took 2 seconds!
                
                console.log(JSON.stringify(object.data[choice]));

                var url = object.data[2].images.fixed_width.url; 

                // url = JSON.stringify(url);
                // url = "http:\/\/giphy.com\/gifs\/mashable-nfl-lady-gaga-26xBMBPblt8oPCEN2"; 

                callback(module.exports.returnData(url));

        }
    });




    }



}; 