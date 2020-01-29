let openedTabs = [];
const SERVER_URL = 'http://192.168.1.241:3000/';
const userId = 1;

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg,sender) => {
  // whenever a new url is loaded into a tab
    if (msg.pageData) {
      return onNewUrl(msg.pageData,sender.sender.tab.id);
    }
    // Else this is a timer order
    return toggleIdle(sender.sender.tab.id,msg.idle);
  });
});

const toggleIdle = (tabId,idle)=>{
  log(`Toggle idle called with argument ${idle}`,'ua');
  const tab = openedTabs[tabId];
  if (!tab) {
    log('No found tab','e');
  }

  if (!tab.startTime) {
    tab.startTime = tab.timeStopped = + new Date();
    tab.isIdle = false;
    log(['Tab active for the first time ',tab.pageTitle],'ua');
    return;
  }
  if (idle) {
    tab.isIdle = true;
    log(['Tab idle',tab.pageTitle],'ua');
    tab.visitTimeSpent += + new Date() - tab.timeStopped;
    tab.timeStopped = + new Date();
  } else {
    tab.isIdle = false;
    log(['Tab active',tab.pageTitle],'ua');
  }

};

const onNewUrl = (pageData,tabId)=>{
  log('New page visited 👇 ','ua');
  // Could there be an edgecase ?
  if (!pageData || !(pageData.fullUrl || pageData.pageTitle)) {
    log('Incomplete pageData passed to background.js','e');
    return;
  }
  log(pageData,'table');
  if (openedTabs[tabId]) {
    log('Tab content replaced','ua');
    if (openedTabs[tabId].fullUrl !== pageData.fullUrl) {
      sendPageData(openedTabs[tabId]);
    } else {
      log('Refresh','ua');
      return;
    }
  }
  pageData.userId = userId;
  pageData.visitStartTime = +new Date();
  pageData.tabId = tabId;
  pageData.visitTimeSpent = 0;
  openedTabs[tabId] = pageData;
};

chrome.tabs.onRemoved.addListener((tabId) =>{
  log('Tab removed','ua');
  if (!openedTabs[tabId]) {
    log('No url found','w');
    return; // tab with no url, such as widget
  }

  sendPageData(openedTabs[tabId]).then((res)=>{
    delete openedTabs[tabId];
  }).catch(e => log(e,'error','e'));
});

const sendPageData = async (pageData) => {
  log('Sending data to server 👇 ','sa');
  if (!pageData.isIdle && pageData.visitTimeSpent !== 0) {
    pageData.visitTimeSpent += + new Date() - pageData.timeStopped;
  }
  pageData.userId = userId;
  delete pageData.isIdle;
  delete pageData.timeStopped;
  delete pageData.tabId;

  log(pageData,'table');
  log('Json object sent to the server :👇');
  const pageDataForLog = {...pageData};
  pageDataForLog.pageTitle = pageDataForLog.pageTitle.substr(0,100) + ' ...';
  log(JSON.stringify(pageDataForLog,null,2));
  const response = await fetch(SERVER_URL,{
    method : 'POST',
    mode : 'cors',
    cache : 'no-cache',
    credentials : 'same-origin',
    headers : {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(pageData), // body data type must match "Content-Type" header
  });
  if (!(response.status === 201 && response.ok)) {
    log(['Response status',response.status],'sa');
    log(['Response body',JSON.stringify(response.body)],'sa');
  }
};

const log = (input,consoleFunc = 'log') => {
  const logStyles = {
    ua : {style : 'color: Chocolate;',before : '🚶'}, // user action
    sa : {style : 'color: lightblue',before : '🚀 '}, // software action
    w : {style : 'color: yellow',before : '⚠️'},
    e : {style : 'color: red;font-weight:bold',before : '💩'},
    log : {style : '',before : ''}
  };
  switch (consoleFunc) {
  case 'table':
    console.table(input);
    break;
  default:
    if (!logStyles[consoleFunc])consoleFunc = 'log';
    if (typeof input === 'object') {
      console.log(`%c ${logStyles[consoleFunc].before} ${input[0]} : %c${input[1]} `,logStyles[consoleFunc].style,logStyles[consoleFunc].style + 'font-style:italic;');
    } else {
      console.log(`%c ${logStyles[consoleFunc].before} ${input}`,logStyles[consoleFunc].style);
    }
    break;
  }
};
