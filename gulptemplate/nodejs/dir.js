var fs = require('fs');

fs.unlink('writeMe.txt',function(err){
    console.log('delete a file')
})
fs.mkdir('stuff',function(){
   fs.readFile('Readme.txt','utf-8',function(err,data){
       fs.writeFile('./stuff/writeMe.txt',data,function(){
           console.log('wirtedown')
       })
  
    })
})

fs