var http =require('http');

var server = http.createServer(function(req,res){
    console.log('Recive')
    res.writeHead(200,{'Content-Type':'text/plain'});
    var obj = {
        name:'chenjintao',
        age:10
    }
    res.end(JSON.stringify(obj))
})

server.listen(3001)
console.log('server work')