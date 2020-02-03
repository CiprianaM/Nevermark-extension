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
  let newText = testQuery.results[0].pageTitle;
  console.log(newText);
  let newHref = `https://${testQuery.results[0].url}`;

   let textDiv = document.createElement('div');
   textDiv.id = 'textDiv';
   textDiv.style.textAlign = 'center';
   textDiv.style.marginTop = '10px';
   textDiv.style.marginBottom = '10px';
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

}
