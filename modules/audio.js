module.exports={

    returnData:function(data){
        return data;
    },

    transcribe:function(senderID, timeOfMessage, fs, request, speechClient, file, callback){

                // 1- DOWNLOAD THE FILE 
                var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };

                var filename = './static/'+''+senderID+'_'+timeOfMessage+'.mp4' ; 

                download(file, filename, function(){    
                    
                // 2- READ the file as BASE64
               fs.readFile(filename, {encoding: 'base64'}, function(err,data){
                if (!err){   


                    // STORE the file as BASE64
                    fs.writeFile(filename, data, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    console.log("The file was saved!"); }); 
                


                    const req = {
                    encoding: 'LINEAR16',
                    sampleRate: 16000
                    };

              // 3 - TRANSCRIBE audio
                    speechClient.recognize(filename, req)
                    .then((results) => {
                        const transcription = results[0];

                        console.log(`Transcription: ${transcription}`);
                        callback(module.exports.returnData(transcription));
                    });

                    

                   
                } else{
                    console.log(err);
                }

});





                    

                }); 

    },


            



};