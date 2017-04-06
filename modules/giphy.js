
module.exports = {
    returnData:function(data){
        return data;
    },

    // Get a random result within 100 results with a set of keywords 
    // Keywords is a sentence separated by spaces! 

    get:function(request, keywords, limit, callback){        
        var keywords = encodeURIComponent(keywords);        
        var options = {
                url: 'http://api.giphy.com/v1/gifs/search?q='+keywords+'&api_key=dc6zaTOxFJmzC&limit='+limit+'&offset=0',
                method: 'GET' }; 

    request(module.exports.options, function (error, response, body) {
        if (!error && response.statusCode == 200) {                
                callback(module.exports.returnData(body));
        }
    });




    }



}