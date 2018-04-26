var fs =  require('fs');

var readstream = fs.createReadStream('stream.txt','utf-8');
var writestream = fs.createWriteStream('writeMe.txt');

   var data; //=>去拼接

    readstream.on('data',function(chunktypeString){
        writestream.write(chunktypeString)
    })
    readstream.on('end',function(){
        console.log('end')
    })
    // readstream.pipe(writestreams)