import './main.css';
var div = document.createElement('div');
var text = document.createTextNode('hdfdfdfdfdfddd');
div.appendChild(text)
document.getElementsByTagName('body')[0].appendChild(div);
if(module.hot){
    module.hot.accept()
  }
