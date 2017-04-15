module.exports = {

    returnData:function(data){
        return data;
    },

    // -1- Insert a new 'entry' in the 'entries' collection.
    // -2- Insert a reference '_id' to the entry inside user_entries 
    // in the 'users' collection for the user where : 'userID' = userID... 


    addUser: function(MongoClient, assert, db_url, userID, first_name, last_name, profile_pic, gender, callback){
        MongoClient.connect(db_url, function(err, db) {   //

                    assert.equal(null, err);
                     
                    var users = db.collection('users');  
                    users.insertOne(   
                        
                        // TODO1: create an index user '_id' + UNIQUE 
                        // TODO2: handle if user already exists (server restarted and session deleted)...

                        { _id:userID, first_name:first_name, last_name:last_name, 
                          profile_pic:profile_pic, gender:gender, 
                          user_entries:[    // use $push to update value 
                             // _id1 ,
                            // _id2 , 
                           // ... 
                          ]         
                        }

                    , function(err, result) {    
                        db.close();   
                        console.log("====== MONGO_LOGGER: USER ADDED COMMITTED! =====");
                        callback(module.exports.returnData(result));                        
                    });

            }); //  



    },

    commitEntry: function (MongoClient, assert, db_url, entryText, entryDate, entryAnalysis, userID, callback){
                MongoClient.connect(db_url, function(err, db) {   //

                    assert.equal(null, err);

                    var entries = db.collection('entries');  
                    var users = db.collection('users');  

                    entries.insertOne(   
                        { entryText: entryText, 
                        entryDate: entryDate,
                        entryAnalysis: entryAnalysis, 
                        userID: userID }

                    , function(err, result) {                                                                    
                        
                        // 1- get '_id' of the stored entry...   
                      //   var _id = result.ops._id; 

                        // 2- add the '_id' to the entries in user's document in users collection
                        




                        db.close();   
                        console.log("====== MONGO_LOGGER: ENTRY COMMITTED! =====");             
                        callback(module.exports.returnData(result));                        
                    });

            }); //  
    },

        // ... an index on USERID in the users collection is REQUIRED for efficient operation!

};