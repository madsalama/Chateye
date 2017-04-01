
module.exports = {

    detect:function(visionClient, image){    

   visionClient.detectFaces(image, function(err, faces) {
    
        console.log(faces);
        var faces = JSON.stringify(faces);
        console.log(faces);
        console.log(err);

});
  
    }

}






