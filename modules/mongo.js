module.exports = {

    returnData:function(data){
        return data;
    },

    commitEntry: function (MongoClient, assert, db_url, entryText, entryDate, entryAnalysis, userID, callback){

                MongoClient.connect(db_url, function(err, db) {
                    assert.equal(null, err);

                    var collection = db.collection('entries');                    
                    collection.insertOne(   
                        { entryText: entryText, 
                        entryDate: entryDate,
                        entryAnalysis: entryAnalysis, 
                        userID: userID }

                    , function(err, result) {
                        db.close();           
                        console.log("====== MONGO_LOGGER: ENTRY COMMITTED! =====");             
                        callback(module.exports.returnData(data));                        
                    });
            });
    },



};