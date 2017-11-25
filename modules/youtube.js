
module.exports = {
    returnData:function(data){
        return data;                
    },

getVideo: function(request, keywords, limit, callback){
        var keywords = encodeURIComponent(keywords);  
        var headers = {'Referrer': 'https://chatzer.herokuapp.com'};

        var options = {
                url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCRWF1EfsvVlXTSLsG6XWir2KuRyPtkBB8&part=snippet\
&q='+keywords+'&order=viewCount&maxResults='+limit,
                method: 'GET',
                headers: headers
            }; 

                request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var choice = Math.floor(Math.random() * (limit-1));          // + 0 (from zero to limit)  
                          
                var object = JSON.parse(body);            
                // console.log(body);

                callback(module.exports.returnData(object.items[choice]));
            }
       else
       {        
            console.log(body);
       }
}
            );


}
// OUTPUT IS A YT LINK: https://www.youtube.com/watch?v=videoId



};


