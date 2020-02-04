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

  // Create the content for the tags
  let resultTitle = `Nevermark search: ${testQuery.results[0].pageTitle}`;
  let resultText = `${testQuery.results[0].pageText}`;
  let resultTimespent = `${testQuery.results[0].lastVisitTime}`;
  let resultUrl = `https://${testQuery.results[0].url}`;
  let resultImg = `${testQuery.results[0].protocol}://${testQuery.results[0].domain}/favicon.ico`;

if (testQuery.results[0].domain !== 'www.google.com') {
  // Create the various HTML elements
  let resultContainer = document.createElement('div');
  resultContainer.id = 'resultContainer';
  document.getElementById('extabar').append(resultContainer);



  let resultTitleDiv = document.createElement('div');
  resultTitleDiv.id = 'resultTitle';
  resultTitleDiv.innerHTML = resultTitle;
  document.getElementById('resultContainer').append(resultTitleDiv);

  let resultImgTag = document.createElement('img');
  resultImgTag.id = 'resultImg';
  resultImgTag.src = resultImg;
  document.getElementById('resultContainer').prepend(resultImgTag);


  /* let resultTextDiv = document.createElement('div');
  resultTextDiv.id = 'resultText';
  resultTextDiv.innerHTML = resultText;
  document.getElementById('resultContainer').append(resultTextDiv); */


  let resultUrlLink = document.createElement('a');
  resultUrlLink.id = 'resultUrl';
  resultUrlLink.href = resultUrl;
  resultUrlLink.target = '_blank';
  resultUrlLink.innerText = resultUrl;
  document.getElementById('resultContainer').append(resultUrlLink);


  let resultTimespentDiv = document.createElement('div');
  resultTimespentDiv.id = 'resultTimeSpent';
  resultTimespentDiv.innerHTML = resultTimespent;
  document.getElementById('resultContainer').append(resultTimespentDiv);
}



let style = document.createElement('style');
// Assign style
style.innerHTML = `
#resultContainer {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  font-family: 'Lato', sans-serif;
  border: 1px solid black;
  border-radius: 5px;
  width: 50%;
  margin-left: 13%;
  overflow: hidden;
  text-overflow: ellipsis;
}

#resultContainer:hover {
  background: #eee;
}

#resultTitle {
  font-size: 16px;
  padding-bottom: 10px;
}

#resultText {
  font-size: 14px;
  padding-bottom: 10px;
  opacity: 0.7;
}

#resultUrl {
  color: #A15CFF;
  font-size: 10px;
  padding-bottom: 5px;
}

#resultImg {
  width: 16px;
  height:16px;
  margin-right:5px;
  background-color:black;
  vertical-align: bottom;
  border-radius: 16px;
}

strong {
  font-weight: 900;
}

#resultTimeSpent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: 0.4;
  padding-top: 5px;

}
`;
document.head.appendChild(style);

let linkFont = document.createElement('link');
linkFont.setAttribute('rel', 'stylesheet');
linkFont.tseAttribute('href', 'https://fonts.googleapis.com/css?family=Lato&display=swap');
linkFont.setAttribute('type', 'text/css');
document.head.appendChild(linkFont);
}
