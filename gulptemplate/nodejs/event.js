var events = require('events');

var myEvent =new  events.EventEmitter();

myEvent.on('fuck',function(m){
    console.log(m)
})
myEvent.emit('fuck','hellow mother fucker')