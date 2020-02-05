const SERVER_URL = 'https://192.168.1.242/search';
const DEFAULT_ROUTE = '/';

// const queryApi = async (search) => {

//   try {
//     search = encodeURI(search);
//     const res = await fetch(SERVER_URL + DEFAULT_ROUTE + search)
//     return res.json();
//   }
//   catch (err) {
//     console.log(err);
//   }
// }
window.onload = async () => {
  const regex = /q={1}(\S+?)&/;
  let url = window.location.href;
  url = decodeURI(url);
  let result = url.match(regex);
  let testQuery = {results: [{
    pageTitle: 'Testing the fake data',
    pageText: 'This is the text of the fake data result',
    lastVisitTime: '2 days ago',
    url: 'ole.com.ar',
    domain: 'ole.com.ar',
    protocol: 'https',
    hits: '2 visits'
  }]};
  // let testQuery = await queryApi(result[1].replace('+', ' '));
  console.log(testQuery.results[0]);

  // Create the content for the tags
  let resultTitle = `${testQuery.results[0].pageTitle}`;
  let resultText = `${testQuery.results[0].pageText}`;
  let resultTimespent = `${testQuery.results[0].lastVisitTime}`;
  let resultUrl = `https://${testQuery.results[0].url}`;
  let resultImg = `${testQuery.results[0].protocol}://${testQuery.results[0].domain}/favicon.ico`;
  let numberOfVisits = testQuery.results[0].hits;

  if (testQuery.results[0].domain !== 'www.google.com') {
  // Create the various HTML elements
  let resultContainer = document.createElement('div');
  resultContainer.id = 'resultContainer';
  document.getElementById('extabar').append(resultContainer);

  let nevermarkLogo = document.createElement('div');
  nevermarkLogo.id = 'nevermark-logo';
  nevermarkLogo.innerHTML = 'nevermark result';
  document.getElementById('resultContainer').append(nevermarkLogo);

  let firstRow = document.createElement('div');
  firstRow.id = 'first-row';
  document.getElementById('resultContainer').append(firstRow);

  let titleContainer = document.createElement('div');
  titleContainer.id = 'title-container';
  document.getElementById('first-row').append(titleContainer);

  let resultImgTag = document.createElement('img');
  resultImgTag.id = 'resultImg';
  resultImgTag.src = resultImg;
  document.getElementById('title-container').append(resultImgTag);

  let resultTitleDiv = document.createElement('div');
  resultTitleDiv.id = 'resultTitle';
  resultTitleDiv.innerHTML = resultTitle;
  document.getElementById('title-container').append(resultTitleDiv);

  let resultTimespentDiv = document.createElement('div');
  resultTimespentDiv.id = 'resultTimeSpent';
  resultTimespentDiv.innerHTML = resultTimespent;
  document.getElementById('first-row').append(resultTimespentDiv);




  // let resultImgTag = document.createElement('img');
  // resultImgTag.id = 'resultImg';
  // resultImgTag.src = resultImg;
  // document.getElementById('resultContainer').prepend(resultImgTag);


  let resultTextDiv = document.createElement('div');
  resultTextDiv.id = 'resultText';
  resultTextDiv.innerHTML = resultText;
  document.getElementById('resultContainer').append(resultTextDiv);

  let thirdRow = document.createElement('div');
  thirdRow.id = 'third-row';
  document.getElementById('resultContainer').append(thirdRow);


  let resultUrlLink = document.createElement('a');
  resultUrlLink.id = 'resultUrl';
  resultUrlLink.href = resultUrl;
  resultUrlLink.target = '_blank';
  resultUrlLink.innerText = resultUrl;
  document.getElementById('third-row').append(resultUrlLink);

  let numberOfVisitsDiv = document.createElement('div');
  numberOfVisitsDiv.id = 'numberOfVisits';
  numberOfVisitsDiv.innerHTML = numberOfVisits;
  document.getElementById('third-row').append(numberOfVisitsDiv);


  // let resultTimespentDiv = document.createElement('div');
  // resultTimespentDiv.id = 'resultTimeSpent';
  // resultTimespentDiv.innerHTML = resultTimespent;
  // document.getElementById('resultContainer').append(resultTimespentDiv);
}



let style = document.createElement('style');
// Assign style
style.innerHTML = `
#resultContainer {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  font-family: 'Lato', sans-serif;
  border-color: #A15CFF;
  border-radius: 4px;
  width: 50%;
  margin-left: 13%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  background: rgb(248, 248, 248);
}

#nevermark-logo {
  font-style: italic;
  font-weight: 600;
  font-size: 12px;
  padding-bottom: 5px;
}

#first-row, #third-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#first-row {
  padding-bottom: 10px;
}

#title-container {
  display: flex;
  flex-direction: row;
}

#resultContainer:hover {
  background: #eee;
}

#resultTitle {
  font-size: 16px;
  font-weight: 550;
  align-self: center;
}

#resultText {
  font-size: 14px;
  padding-bottom: 10px;
  opacity: 0.7;
}

#resultUrl {
  color: #A15CFF;
  font-size: 10px;
  align-self: center;
}

#resultImg {
  width: 16px;
  height:16px;
  margin-right:5px;
  background-color:black;
  vertical-align: bottom;
  border-radius: 16px;
  align-self: center;
}

strong {
  font-weight: 900;
}

#resultTimeSpent, #numberOfVisits {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: 0.4;
  font-size: 12px;
}
`;
document.head.appendChild(style);

let linkFont = document.createElement('link');
linkFont.setAttribute('rel', 'stylesheet');
linkFont.tseAttribute('href', 'https://fonts.googleapis.com/css?family=Lato&display=swap');
linkFont.setAttribute('type', 'text/css');
document.head.appendChild(linkFont);
}
