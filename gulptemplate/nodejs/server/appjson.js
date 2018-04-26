var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'application/json'});
    var obj = {
        name:'chenjintao',
        age:10
    }
    res.end(JSON.stringify(obj))
})
server.listen(3000);
console.log('server run')