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

                console.log(JSON.stringify(faces[0].confidence));

                console.log(JSON.stringify(faces[0].joy));
                console.log(JSON.stringify(faces[0].joyLikelihood));

                console.log(JSON.stringify(faces[0].sorrow));
                console.log(JSON.stringify(faces[0].sorrowLikelihood));

                console.log(JSON.stringify(faces[0].anger));
                console.log(JSON.stringify(faces[0].angerLikelihood));

                console.log(JSON.stringify(faces[0].surprise));
                console.log(JSON.stringify(faces[0].surpriseLikelihood));

                console.log(JSON.stringify(faces[0].underExposed));
                console.log(JSON.stringify(faces[0].underExposedLikelihood));

                console.log(JSON.stringify(faces[0].blurred));
                console.log(JSON.stringify(faces[0].blurredLikelihood));

                console.log(JSON.stringify(faces[0].headwear));
                console.log(JSON.stringify(faces[0].headwearLikelihood));


            // :TODO: delete the image...

        }); 


        });
        

        






  
    }

}






