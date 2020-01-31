window.onload = () => {
  let grab = window.location.href.split('&oq');
  //alert(grab);
  addStyles(styles);
}

// STEPS
// 1st: The script should grab the value of the input field... somehow...
// 2nd:

const addStyles = () => {
  // Create style document
  let css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
}
// Set the style
let styles = ' div { text-align: center}';
  styles += ' div {color: red}';



let newDiv = document.createElement('div');
newDiv.id = 'newId';
newDiv.style.color = 'red';
let newText = document.createTextNode('Hello There!');
newDiv.appendChild(newText);

document.getElementById('extabar').prepend(newDiv);
