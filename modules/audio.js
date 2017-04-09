module.exports={

    returnData:function(data){
        return data;
    },

    download:function(senderID, timeOfMessage, fs, request, file, speech2text, callback){

                // 1- DOWNLOAD THE FILE 
                var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };

                var filename = './static/'+''+senderID+'_'+timeOfMessage+'' ; 
                // var filename = './static/audio.wav';

                download(file, filename, function(){                    
                        callback(module.exports.returnData("file downloaded!"));
                        
                        // DO SOMETHING WITH THE FILE 

                        var files = [filename];
                        for (var file in files) {
                        var params = {
                            audio: fs.createReadStream(files[file]),
                            content_type: 'audio/l16',
                            timestamps: true,
                            // word_alternatives_threshold: 0.9,
                            // keywords: ['colorado', 'tornado', 'tornadoes'],
                            // keywords_threshold: 0.5,
                            continuous: true
                        };

                        speech2text.recognize(params, function(error, transcript) {
                            if (error){
                                console.log('Error:', error); 
                                // then delete audio 
                            }
                            
                            else{
                                 callback(JSON.stringify(transcript, null, 2));  
                                 // then delete audio
                            }
                           
                        });
                    }
                    
                }); 

    },


            



};