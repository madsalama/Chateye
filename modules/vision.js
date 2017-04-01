// ================================
//    MODULE POTENTIAL OUTPUTS 
// ================================

 // faces = [
  //   {
  //     angles: {pan,tilt,roll},
  //     bounds: {
  //       head: [{x,y},{x,y},{x,y},{x,y}],
  //       face: [{x,y},{x,y},{x,y},{x,y}]
  //     },
  //     features: {
  //       confidence: 34.489909,
  //       chin: {
  //         center: {x,y,z},
  //         left: {x,y,z},
  //         right: {x,y,z}
  //       },
  //       ears: {
  //         left: {x,y,z},
  //         right: {x,y,z}
  //       },
  //       eyebrows: {
  //         left: {
  //           left: {x,y,z},
  //           right: {x,y,z},
  //           top: {x,y,z}
  //         },
  //         right: {
  //           left: {x,y,z},
  //           right: {x,y,z},
  //           top: {x,y,z}
  //         }
  //       },

  //       eyes: {
  //         left: {
  //           bottom: {x,y,z},
  //           center: {x,y,z},
  //           left: {x,y,z},
  //           pupil: {x,y,z},
  //           right: {x,y,z},
  //           top: {x,y,z}
  //         },
  //         right: {
  //           bottom: {x,y,z},
  //           center: {x,y,z},
  //           left: {x,y,z},
  //           pupil: {x,y,z},
  //           right: {x,y,z},
  //           top: {x,y,z}
  //         }
  //       },
  //       forehead: {x,y,z},
  //       lips: {
  //         bottom: {x,y,z},
  //         top: {x,y,z}
  //       },
  //       mouth: {
  //         center: {x,y,z},
  //         left: {x,y,z},
  //         right: {x,y,z}
  //       },
  //       nose: {
  //         bottom: {
  //           center: {x,y,z},
  //           left: {x,y,z},
  //           right: {x,y,z}
  //         },
  //         tip: {x,y,z},
  //         top: {x,y,z}
  //       }
  //     },
  //     confidence: 56.748849,
  //     blurry: false,
  //     dark: false,
  //     happy: false,
  //     hat: false,
  //     mad: false,
  //     sad: false,
  //     surprised: false
  //   }
  // ]

module.exports = {

    returnData:function(data){
        console.log(data.length);
        return data;
    },

    detect:function(senderID, timeOfMessage, fs, request, visionClient, image, callback){    

            var results={};

            // download the image & access it!
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){

            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);});
            };

            download(image, './static/'+''+senderID+'_'+timeOfMessage+'.jpg', function(){
            console.log('image downloaded!');
            var image_path = './static/'+''+senderID+'_'+timeOfMessage+'.jpg';

            visionClient.detectFaces(image_path)
            .then((results) => {
                const faces = results[0];

                console.log('Faces:');
                faces.forEach((face, i) => {

                    results[i] = {

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
                        
                callback(module.exports.returnData(results));

                });
  });



        });


    }

}






