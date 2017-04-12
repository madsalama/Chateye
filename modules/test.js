

var users = []; 
users.push( { id:'1', action:'' } );
users.push( { id:'2', action:'listen' } );

var lookup = {};

for (var i = 0, len = users.length; i < len; i++) {
    lookup[users[i].id] = users[i];
};

console.log(lookup);
console.log(lookup[1]);

lookup[1]? console.log("USER SESSION EXISTS..."):users.push( { id:'1', action:'' } );
console.log();
