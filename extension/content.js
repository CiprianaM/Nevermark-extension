let idle = true;
const EXTENSION_ID = 'hdmgnjfddgdcogahdljmficcbhpceiod';
let timer;

if(!(!document.URL || document.URL.startsWith('chrome://'))){
  const pageData = {
    fullUrl : document.URL,
    fullTitle: document.title,
    text: document.body.innerText.replace(/^(\s*\r\n){2,}/,'\r\n')
  };
    
  const resetIdleTimer = ()=> {
    clearTimeout(timer);
    if(idle){
      idle = false;
      chrome.runtime.sendMessage(EXTENSION_ID,{idle});
    }
    timer = setTimeout(setIdle,3000)
  }
  const setIdle = () => {
    idle = true;
    chrome.runtime.sendMessage(EXTENSION_ID,{idle});
  }
 
  chrome.runtime.sendMessage(EXTENSION_ID,{pageData});
  document.body.addEventListener('mousemove',resetIdleTimer);
  document.addEventListener('scroll',resetIdleTimer);
    
}

