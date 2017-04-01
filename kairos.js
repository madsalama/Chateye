
module.exports = {

    detect: function(data) {

    var request = require('request');
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     ' application/json',
        'app_id': 'b1592ea1',
        'app_key': 'ddfb3317a291a021d1ee240b54f517cf'
    };

    
    var detect = {
        url: 'https://api.kairos.com/detect',
        method: 'POST',
        json: data,
        headers: headers 
    };

    

    request(detect, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body));
        } else {
        console.error(response);
        console.error(error);
        }
    });



    },


enroll:function(data) {

    var request = require('request');
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     ' application/json',
        'app_id': 'b1592ea1',
        'app_key': 'ddfb3317a291a021d1ee240b54f517cf'
    };

    
    var enroll = {
        url: 'https://api.kairos.com/enroll',
        method: 'POST',
        json: data,
        headers: headers 
    };

    request(enroll, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body));
        } else {
        console.error(response);
        console.error(error);
        }
    });



},

analyze:function(data) {

    var request = require('request');
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     ' application/json',
        'app_id': 'b1592ea1',
        'app_key': 'ddfb3317a291a021d1ee240b54f517cf'
    };

    
    var analyze = {
        url: 'https://api.kairos.com/analytics',
        method: 'GET',
        json: data,
        headers: headers 
    };

    request(analyze, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body));
        } else {
        console.error(response);
        console.error(error);
        }
    });



}







}
