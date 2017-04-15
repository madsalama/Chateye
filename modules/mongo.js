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

                        if (result){
                            console.log("====== MONGO_LOGGER: USER ADDED COMMITTED! =====");
                            callback(module.exports.returnData(result));
                        }

                        else {
                            // console.log(err);
                        }

                        
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

                     // ... add a reference to entry in the user's document                     
                      var entry_id = result.ops[0]._id;
                      console.log("==== ENTRY ID: " + entry_id );

                       users.update(
                        { _id: userID },
                        { $addToSet: { user_entries: entry_id  } } );

                        db.close();
                        console.log("====== MONGO_LOGGER: ENTRY COMMITTED! =====");             
                        callback(module.exports.returnData(result));   

                    });

            }); //  
    },


    getUserEntries: function(MongoClient, assert, db_url, userID, callback){
                MongoClient.connect(db_url, function(err, db) {   //
                    
                    assert.equal(null, err);
                    var entries = db.collection('entries');  
                    var users = db.collection('users');  

                    // do an application-level join                 
                    users.findOne({_id: userID}, function(err, result){     

                        var user_entries = entries.find({_id: { $in : result.user_entries } } ).toArray();
                        console.log("===== ENTRIEZ =====");
                        console.log(user_entries);

                    }); 

                    //var user_entries = entries.find({_id: { $in : user.user_entries } } ).toArray(
                     //   function(err, docs) {
                     //               assert.equal(null, err);
                     //               console.log(docs);
                     //               console.log(err);
                    //                db.close();
                    //    }

                   // ) ;
                   // callback(module.exports.returnData(user_entries));

                });

    }

        // ... an index on USERID in the users collection is REQUIRED for efficient operation!

};