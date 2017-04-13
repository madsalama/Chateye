

// takes translateClient


module.exports = {


    returnData:function(data){
        return data;
    },

    detectLang:function(translateClient, input, callback){

            return translateClient.detect(input)
            .then((results) => {
      
      let detections = results[0];

      if (!Array.isArray(detections)) {
        detections = [detections];
      }
   
      detections.forEach((detection) => {
        // console.log(`${detection.input} => ${detection.language}`);
        callback(module.exports.returnData(`${detection.language}`)); 

      });

      
      
    });



    },

    trans2eng:function(translateClient, input, target, callback){

        return translateClient.translate(input, target).then((results) => {
            
        let translations = results[0];
        translations = Array.isArray(translations) ? translations : [translations];

        console.log('Translations:');
        translations.forEach((translation, i) => {
            console.log(`${input[i]} => (${target}) ${translation}`);
        });

        callback(module.exports.returnData(translations)); 
        });



    }



};