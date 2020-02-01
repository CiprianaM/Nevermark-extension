window.onload = () => {
  let regex = /q={1}(\S+?)&/;
  let paragraph = window.location.href;
  let result = paragraph.match(regex);

  alert(result[1]);
}

// STEPS
// 1st: The script should grab the value of the input field... somehow...
// 2nd:



let newDiv = document.createElement('div');
newDiv.id = 'newId';
newDiv.style.color = 'red';
let newText = document.createTextNode('Hello There!');
newDiv.appendChild(newText);

document.getElementById('extabar').prepend(newDiv);
