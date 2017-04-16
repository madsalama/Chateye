
module.exports = {
    returnData:function(data){
        return data;                
    },


// API KEY = AIzaSyD_cG0i-KHnuVJ2HorENASSz9F0pI5dkl4

getVideo: function(request, youtube, keywords, callback){

     youtube.search.list({
    part: 'id,snippet',
    q: keywords
    
  }, function (err, data) {

      console.log(" ====== YOUTUBE RESULTS ====== ");
      callback(module.exports.returnData(data));

    if (err) {
      console.error('Error: ' + err);
    }
    if (data) {
      console.log(" ====== YOUTUBE RESULTS ====== ");
      callback(module.exports.returnData(data));

      // console.log(util.inspect(data, false, null));

    }
  });


}
// OUTPUT IS A YT LINK: https://www.youtube.com/watch?v=videoId



};


