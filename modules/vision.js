
module.exports = {

    detect:function(senderID, timeOfMessage, fs, request, visionClient, image){    

            // download the image & access it!
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){

            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                
                console.log(JSON.stringify(err));

            });
            };

            download(image, './static/'+''+senderID+'_'+timeOfMessage+'.jpg', function(){
            console.log('image downloaded!');
        });
        

        var image_path = './static/'+''+senderID+'_'+timeOfMessage+'.jpg'

        visionClient.detectFaces(image_path, function(err, faces) {

            var faces = JSON.stringify(faces);
            var err = JSON.stringify(err); 
        
            console.log(faces);
            console.log(err);

            // delete the image. 

});
  
    }

}






