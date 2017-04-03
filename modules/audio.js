module.exports={

download:function(file){

     // download the image & access it!
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){

            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
            };

            var filename = './static/'+''+senderID+'_'+timeOfMessage+'.mp4' ; 

            download(file, './static/audio.mp4', function(){                
                console.log("....audio received and downloaded!");
            }); 

}

}