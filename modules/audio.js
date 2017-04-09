module.exports={

    returnData:function(data){
        return data;
    },

    headers:{
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded',
            "apikey": "NWI7R-QImkho2Vp1HE_0jYU4SvzRoOKoFO2rniLiLZPI6JhmWmLdInskuhgzuigTas0F0zdmxqWqMx0iWHXG_A",
            "input": "upload",
            "wait": true,
            "download": "inline" 
        },


  options:{
                url: 'https://api.cloudconvert.com/convert',
                method: 'POST',                   
                headers: module.exports.headers 
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

                var filename = './static/'+''+senderID+'_'+timeOfMessage+'' ;             

                download(file, filename, function(){                    
                        

                fs.createReadStream(filename)
                .pipe(cloudconvert.convert({
                    "inputformat": "mp4",
                    "outputformat": "wav",
                    "input": "upload",
                    "file": filename,
                    "filename": filename+".wav"
                }))
                .pipe(fs.createWriteStream(filename+".wav"));

                        var file = filename+".wav" ; 
                        var params = {
                            audio: fs.createReadStream(file),
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
                    
                    
                }); 

    },


            



};