const SERVER_URL = 'https://192.168.1.242/search';
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
  console.log(testQuery.results[0]);
  let newText = `<h1>Nevermark search: ${testQuery.results[0].pageTitle}
   | ${testQuery.results[0].lastVisitTime}</h1>`;
  console.log(newText);
  let newHref = `https://${testQuery.results[0].url}`;
  let textDiv = document.createElement('div');
  const link = document.createElement('link');
  textDiv.id = 'textDiv';

  let style = document.createElement('style');
  style.innerHTML = `
  #textDiv h1 {
    color: black;
    margin: auto;
    color: #black;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    background-color: #fcfcfc;
    width: 50%;
    border-radius: 5px;
    margin-left: 15%;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid black;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  #textDiv:hover {
    color: red;
  }
  `;


  //  textDiv.innerHTML = newText;
   document.getElementById('extabar').append(textDiv);
  let newLink = document.createElement('a');
  newLink.href = '';
  newLink.id = 'searchLink';
  newLink.href = newHref;
  newLink.target = '_blank';
  newLink.innerHTML = newText;
  newLink.id = 'newLink';
  newLink.style.color = 'black';
  document.getElementById('textDiv').append(newLink);
  document.head.appendChild(style);
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato&display=swap');
  document.head.appendChild(link);

  /* let testDiv = document.createElement('div');
  let testText = `<h1>Nevermarks search: A test result here</h1>`;

  testDiv.id = 'testDiv';
  testDiv.innerHTML = testText;

  let style = document.createElement('style');
  style.innerHTML = `
  #testDiv h1 {
    margin: auto;
    color: #black;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    background-color: #fcfcfc;
    width: 40%;
    border-radius: 5px;
    margin-left: 15%;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  `;




  document.getElementById('extabar').append(testDiv);
  document.head.appendChild(style); */
}
