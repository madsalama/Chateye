// ================================
//    MODULE POTENTIAL OUTPUTS 
// ================================

// EXTRACT THESE and feed them into SELFIE_OPINION INTENT
// with the parameters! 

    // emotional state | < 0.3 reliable
    // facial hair?
    // dominant colors? 
    // logos?
    // celebrities?
    // animals? other entities?
    // landmarks?
    // detect TEXT!?
    // detect how many faces in the picture - "you two look amazing!" - "you guys look great!"

module.exports = {

    returnData:function(data){

        // console.log("=== RETURN DATA ===");
       //  console.log(JSON.stringify(data)); 
       //  console.log(data.length+" face(s) detected...");

        return data;

    },

    detect:function(senderID, timeOfMessage, fs, request, visionClient, image, callback){    

            var values = []; 

            // download the image & access it!
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){

            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);});
            };

            download(image, './static/'+''+senderID+'_'+timeOfMessage+'.jpg', function(){            
                var image_path = './static/'+''+senderID+'_'+timeOfMessage+'.jpg';
                visionClient.detectFaces(image_path).then((results) => {

                    const faces = results[0];
                    console.log('Faces:');
                    faces.forEach((face, i) => {

                    values[i] =
                    {
                    "confidence":JSON.stringify(faces[i].confidence),   

                    "joy":JSON.stringify(faces[i].joy),
                    "joyLikelihood":JSON.stringify(faces[i].joyLikelihood),

                    "sorrow":JSON.stringify(faces[i].sorrow),
                    "sorrowLikelihood":JSON.stringify(faces[i].sorrowLikelihood),

                    "anger":JSON.stringify(faces[i].anger),
                    "angerLikelihood":JSON.stringify(faces[i].angerLikelihood),

                    "surprise":JSON.stringify(faces[i].surprise),
                    "surpriseLikelihood":JSON.stringify(faces[i].surpriseLikelihood),

                    "underExposed":JSON.stringify(faces[i].underExposed),
                    "underExposedLikelihood":JSON.stringify(faces[i].underExposedLikelihood),

                    "blurred":JSON.stringify(faces[i].blurred),
                    "blurredLikelihood":JSON.stringify(faces[i].blurredLikelihood),

                    "headwear":JSON.stringify(faces[i].headwear),
                    "headwearLikelihood":JSON.stringify(faces[i].headwearLikelihood)
            };

                

                });

                 callback(module.exports.returnData(values));

  });
  });


    },


 getProminentColor:function(senderID, timeOfMessage, fs, request, visionClient, image, callback){
    
    var values = []; 

            // download the image & access it!
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){

            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);});
            };

            download(image, './static/'+''+senderID+'_'+timeOfMessage+'.jpg', function(){            
                var image_path = './static/'+''+senderID+'_'+timeOfMessage+'.jpg';

                visionClient.detectProperties(image_path)
                .then((results) => {
                values = results[0];

                
                callback(module.exports.returnData(values.colors[0]));

                /*
                console.log('Colors:');
                values.colors.forEach(
                    (color) => console.log(color)
                );
                */

  });

    
       
  });
  
  },    
     

     getSimilarImage:function(senderID, timeOfMessage, fs, request, visionClient, image, callback){
    
    }


};






