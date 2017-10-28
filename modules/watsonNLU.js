
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
                    callback(module.exports.returnData(response));
                    console.log('error:', err);
                }
                else
                {                    
                    callback(module.exports.returnData(response));
                }
                
            });
    }


};