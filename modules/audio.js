module.exports={

    returnData:function(data){
        return data;
    },

    download:function(senderID, timeOfMessage, fs, request, file, callback){

                // 1- DOWNLOAD THE FILE 
                var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };

                // var filename = './static/'+''+senderID+'_'+timeOfMessage+'.raw' ; 

                var filename = './static/audio';

                download(file, filename, function(){                    
                        callback(module.exports.returnData("file downloaded!"));
                }); 

    },


            



};