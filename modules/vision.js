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

    detect:function(senderID, timeOfMessage, fs, request, visionClient, image){    

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
            visionClient.detectFaces(image_path, function(err, faces) {

                console.log("confidence="+JSON.stringify(faces[0].confidence));

                console.log("joy="+JSON.stringify(faces[0].joy));
                console.log("joyLikelihood="+JSON.stringify(faces[0].joyLikelihood));

                console.log("sorrow="+JSON.stringify(faces[0].sorrow));
                console.log("sorrowLikelihood="+JSON.stringify(faces[0].sorrowLikelihood));

                console.log("anger="+JSON.stringify(faces[0].anger));
                console.log("angerLikelihood="+JSON.stringify(faces[0].angerLikelihood));

                console.log("surprise="+JSON.stringify(faces[0].surprise));
                console.log("surpriseLikelihood="+JSON.stringify(faces[0].surpriseLikelihood));

                console.log("underExposed="+JSON.stringify(faces[0].underExposed));
                console.log("underExposedLikelihood="+JSON.stringify(faces[0].underExposedLikelihood));

                console.log("blurred="+JSON.stringify(faces[0].blurred));
                console.log("blurredLikelihood="+JSON.stringify(faces[0].blurredLikelihood));

                console.log("headwear="+JSON.stringify(faces[0].headwear));
                console.log("headwearLikelihood="+JSON.stringify(faces[0].headwearLikelihood));

       
                // Use above features to invoke an intent to describe the image! 
                // lots faces? you guys look amazing! 
                // one face? focus on features. 

            // :TODO: delete the image...

        }); 


        });
        

        






  
    }

}






