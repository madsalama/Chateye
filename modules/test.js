categories = {
            'personal' : 4,
            'swag' : 3,
            'mingle' : 2,
            'attention' : 1
};


console.log(MaxCat(categories));

function MaxCat(obj)
{
var highest = 0;
var arr = [];
for (var prop in obj) {
  if( obj.hasOwnProperty( prop ) ) {
    if(obj[prop] > highest )
          { 
           arr = [];
           highest = obj[prop];
           arr[prop] = highest;
          }
    
  } 
}
    return arr;
}