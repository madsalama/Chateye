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

            download(file, './static/'+''+senderID+'_'+timeOfMessage+'.mp4', function(){            
                var image_path = './static/'+''+senderID+'_'+timeOfMessage+'.mp4';
                console.log("....audio received and downloaded!");
            }); 

}

}