
module.exports = {
    returnData:function(data){
        return data;                // one GIPHY
    },

    get:function(request, keywords, limit, callback){        
        var keywords = encodeURIComponent(keywords);        
        var options = {
                url: 'http://api.giphy.com/v1/gifs/search?q='+keywords+'&api_key=dc6zaTOxFJmzC&limit='+limit+'&offset=0',
                method: 'GET' }; 

    request(module.exports.options, function (error, response, body) {
        if (!error && response.statusCode == 200) {  

                var choice = Math.floor(Math.random() * limit);          // + 0 (from zero to limit)

                console.log("==============");
                console.log(" GIPHY CHOICE = " + choice);
                console.log(JSON.stringify(body.data[2].url));     

                callback(module.exports.returnData(body.data[2].url));

        }
    });




    }



}; 