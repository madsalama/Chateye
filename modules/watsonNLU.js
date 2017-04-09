
module.exports = {
    returnData:function(data){
        return data;                
    },


    manalyze:function(nlu, messageText, callback){
    
            nlu.analyze({
            'html': messageText, 
            'features': {
            'emotion': {
            // 'targets': [
            //   'apples',
            //   'oranges' ]

        }
    }
            }, function(err, response) {
                if (err)
                console.log('error:', err);
                else
                {
                    console.log(JSON.stringify(response, null, 2));
                    callback(module.exports.returnData(response));
                }
                
            });
    }


};