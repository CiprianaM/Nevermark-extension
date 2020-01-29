let idle = true;
let SCRIPT_KILLED = false;
let timer;
let $ = require('jQuery');
let value = 'ENABLE';
let state = {};

console.log('Hello!');

const initState = async () => {
  if (typeof state.active === 'undefined') {
    await chrome.storage.local.set({active: true}, () => {
      state.active = true;
      console.log('activated!');
    });
  }
  else {
    return console.log('state exists');
  }
};

const getState = async () => {
  await chrome.storage.local.get(['active'], (result) => {
    console.log('result.active: ', result.active);
    console.log('state.active: ', state.active);
  });
}

const toggleState = async (val) => {
  if (val === 'ENABLE') {
    await chrome.storage.local.set({active: false}, () => {
      state.active = false;
      console.log('de-activated!');
      console.log(state.active);
    });
  }
   else if (val === 'DISABLE') {
    await chrome.storage.local.set({active: true}, () => {
      state.active = true;
      console.log('re-activated!');
      console.log(state.active);
    });
   }
}








  // Rest goes here...
  if (!(!document.URL || document.URL.startsWith('chrome://'))) {
    const pageData = {
      fullUrl : document.URL,
      fullTitle : document.title,
      text : document.body.innerText.replace(/^(\s*\r\n){2,}/,'\r\n'),
    };

    const port = chrome.runtime.connect({name : 'knockknock'});

    const resetIdleTimer = ()=> {
      if (SCRIPT_KILLED) return;
      clearTimeout(timer);
      if (idle) {
        idle = false;
        port.postMessage({idle});
      }
      timer = setTimeout(setIdle,3000);
    };
    const setIdle = () => {
      if (SCRIPT_KILLED) return;
      idle = true;
      port.postMessage({idle});
    };

    port.postMessage({pageData});
    document.body.addEventListener('mousemove',resetIdleTimer);
    document.addEventListener('scroll',resetIdleTimer);

    port.onDisconnect.addListener(()=>{
      console.log('disconnected from background script');
      document.body.removeEventListener('mousemove',resetIdleTimer);
      document.removeEventListener('scroll',resetIdleTimer);
      SCRIPT_KILLED = true;
    });
  }
