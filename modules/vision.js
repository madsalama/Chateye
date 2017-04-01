
module.exports = {

    detect:function(visionClient, image){    

   visionClient.detectFaces(image, function(err, faces) {
    
        
        var faces = JSON.stringify(faces);
        var err = JSON.stringify(err); 
        
        console.log(faces);
        console.log(err);

});
  
    }

}






