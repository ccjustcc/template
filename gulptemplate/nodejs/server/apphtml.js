var http = require('http');
var fs = require('fs')
var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    var readStream = fs.createReadStream(__dirname+'/index.html','utf-8');
    readStream.pipe(res)
})
server.listen(3000);
console.log('server run')