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
  console.log(testQuery.results[0]);
  let newText = `<h1>Nevermark results: ${testQuery.results[0].pageTitle}</h1>`;
  console.log(newText);
  let newHref = `https://${testQuery.results[0].url}`;
  let textDiv = document.createElement('div');

  const nFilter = document.getElementById('textDiv');
  const addStyles = (element, styles) => {
    for (let id in styles) {
      element.style[id] = styles[id];
    }
  }

  const styles = {
    textAlign: 'center',
    marginTop: '10px',
    marginLeft: '15%',
    marginBottom: '10px',
    backgroundColor: '#ddd',
    width: '50%',
    borderRadius: '5px'
  }

   textDiv.id = 'textDiv';
  //  textDiv.innerHTML = newText;
   document.getElementById('extabar').append(textDiv);
  let newLink = document.createElement('a');
  newLink.href = '';
  newLink.href = newHref;
  newLink.target = '_blank';
  newLink.innerHTML = newText;
  newLink.id = 'newLink';
  newLink.style.color = 'black';
  document.getElementById('textDiv').append(newLink);
  addStyles(nFilter, styles);

}
