module.exports={

    returnData:function(data){
        return data;
    },

    convert:function(request, file, callback){

        // download the image & access it!
                var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };

                var filename = './static/'+''+senderID+'_'+timeOfMessage+'.mp4' ; 

                download(file, filename, function(){    
                    
                    // Convert Downloaded file into BASE64 (SYNC)
                    var base46; 
                    console.log("....audio received/converted to BASE64!");

                }); 

    },


            



};