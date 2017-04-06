module.exports={

    returnData:function(data){
        return data;
    },

    transcribe:function(senderID, timeOfMessage, fs, request, speechClient, file, callback){

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
                    
               fs.readFile(filename, {encoding: 'base64'}, function(err,data){
                if (!err){

                    callback(module.exports.returnData(data));
                    console.log('received data: ' + data);
                    
                    /**
                     * 
                     *                     
                    speechClient.recognize(filename, {
                    encoding: 'BASE64',
                    sampleRate: 16000

                    }, function(err, transcript) {
                    console.log(transcript);
                    console.log(err);});

                     * */    



                   
                } else{
                    console.log(err);
                }

});





                    

                }); 

    },


            



};