
function getMedia(keywords, mediatype, mgiphy){

    var type; 
    var types = ['#giphy','#tweet','#youtube','#insta']; 
    var randType = types[Math.floor(Math.random() * (length(types)-1))];

    (mediatype ==='undefined')? type=randType: type=mediatype; 

    if (mediatype === '#giphy'){
            mgiphy.get(request, keywords, 15, function(url){
                    return url; 
            }));
    }

    if (mediatype === '#tweet'){
           
           return url; 
    }








    return media; 
}





























///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
