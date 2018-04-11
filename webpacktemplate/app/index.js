

// Commonjs是运行时引用
function component() {
    var element = document.createElement('div');

    element.innerHTML = '精度shimming'

   // Assume we are in the context of `window`
   this.alert('Hmmm, this probably isn\'t a great idea...') //this=>gloabal

    return element;
  }
  console.log(this)
  document.body.appendChild(component());
