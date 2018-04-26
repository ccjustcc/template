var fs = require('fs');

var readMe = fs.readFileSync('Readme.txt','utf8');

fs.writeFileSync('writeMe.txt',readMe)