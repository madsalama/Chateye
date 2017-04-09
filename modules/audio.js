module.exports={

    returnData:function(data){
        return data;
    },

    ibm:function(fs, filepath, speech2text, callback){                        
                        var params = {
                            audio: fs.createReadStream(filepath),
                            content_type: 'audio/wav',    // content_type: 'video/mp4' 
                            // timestamps: true,
                            // word_alternatives_threshold: 0.9,
                            // keywords: ['colorado', 'tornado', 'tornadoes'],
                            // keywords_threshold: 0.5,
                            // continuous: true
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

},

convert:function(fs, senderID, timeOfMessage, cloudconvert, callback){
                cloudconvert.convert({
                "inputformat": "mp4",
                "outputformat": "wav",

                // here, service downloads your file, 
                // converts it and then opens a stream for you to download the new file.

                "input": "download",    
                "file": "https://chatzer.herokuapp.com/"+senderID+"_"+timeOfMessage+".mp4",
                "filename": senderID+"_"+timeOfMessage })
                    .pipe(fs.createWriteStream('./static/'+''+senderID+'_'+timeOfMessage+".wav")
                        .on('close', callback));

},
    transcribe:function(senderID, timeOfMessage, fs, request, file, speech2text, cloudconvert, callback){

                // 1- DOWNLOAD THE FILE and CONVERT to WAV 
                var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){

                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };

                var mp4 = './static/'+''+senderID+'_'+timeOfMessage+'.mp4' ;
                var wav = './static/'+''+senderID+'_'+timeOfMessage+'.wav' ;

                download(file, mp4, function(){                                            
                        console.log(" ... audio file downloaded at " + mp4 + "!");                        

                   module.exports.convert(fs, senderID, timeOfMessage, cloudconvert, function(res){                            
                        module.exports.ibm(fs, wav,speech2text, function(result){
                            module.exports.returnData(result);                       
                        }); 
                    }); // CONVERT 
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



                    }); 

    },


            



};