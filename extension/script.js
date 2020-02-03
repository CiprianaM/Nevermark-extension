const SERVER_URL = 'https://192.168.1.243/search';
const DEFAULT_ROUTE = '/';

const queryApi = async (search) => {

  try {
    search = encodeURI(search);
    const res = await fetch(SERVER_URL + DEFAULT_ROUTE + search)
    return res.json();
  }
  catch (err) {
    console.log(err);
  }
}



window.onload = async () => {
  const regex = /q={1}(\S+?)&/;
  let url = window.location.href;
  url = decodeURI(url);
  let result = url.match(regex);
  let testQuery = await queryApi(result[1].replace('+', ' '));
  console.log(testQuery);


 /* let queryDiv = queryApi(result[1])
    .then(res => res.json())
    .then (res.results)
    return res.results;
 */




// STEPS
// 1st: The script should grab the value of the input field... somehow...
//  replace the + character with %20 for a space for better search results

}

/* let newDiv = document.createElement('div');
newDiv.id = 'newId';
newDiv.style.textAlign = 'center';
let newText = document.createTextNode('Hello There!');
newDiv.appendChild(newText); */
// document.getElementById('extabar').prepend();
