
module.exports = {

    detect:function(visionClient, image){    

   visionClient.detectFaces(image)
  .then((results) => {
    const faces = results[0];

    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joy}`);
      console.log(`    Anger: ${face.anger}`);
      console.log(`    Sorrow: ${face.sorrow}`);
      console.log(`    Surprise: ${face.surprise}`);
    });
  });
  
    }

}






