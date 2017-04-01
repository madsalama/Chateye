
module.exports = {

    detect:function(visionClient, image){    

   visionClient.detectFaces(image, function(err, faces) {
    
        var faces = JSON.stringify(faces);
        console.log(faces);

});
  
    }

}






