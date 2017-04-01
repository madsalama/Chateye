

function returnData(data){
    console.log(data.length); // 3
    return data;
}


function getData(callback){

    // ASYNC method 
    db.transaction(
        function(tx){

            // ASYNC METHOD
            tx.executeSql('SELECT * from q', [], function(tx, result){
                
                var q = [];    
                for (var i=0; i < result.rows.length; i++) {
                    q.push(result.rows.item(i));
                };

            console.log(q.length);  // 3            
            callback(returnData(q));

        }
        );
    }
    
    );

} // ===================





// my custom function 
getData(function(q) {
    /* do something with q */
});