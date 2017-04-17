
module.exports = {
    returnData:function(data){
        return data;                
    },


    manalyze:function(nlu, messageText, callback){
    
            nlu.analyze({
            'html': messageText, 
            'features': {
            'emotion': {
 //            'targets': [
   //             'me',
    //            'myself',
     //           'I',
      //         'He',
       //          'She',
        //         'It',
         //        'They' ]
        },

        'sentiment':{
//             'targets': [
 //              'me',
  //             'myself',
   //            'I',
    //           'He',
     //          'She',
      //         'It',
       //        'They' ]
        
    }

    }
            }, function(err, response) {
                if (err)                
                { 
                    callback(module.exports.returnData(JSON.stringify(response, null, 2)));
                    console.log('error:', err); 
                }
                else
                {
                    // console.log(JSON.stringify(response, null, 2));
                    callback(module.exports.returnData(JSON.stringify(response, null, 2)));
                }
                
            });
    }


};