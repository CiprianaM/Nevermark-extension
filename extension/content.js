let idle = true;
let SCRIPT_KILLED = false;
let timer;

if(!(!document.URL || document.URL.startsWith('chrome://'))){
  const pageData = {
    fullUrl : document.URL,
    fullTitle: document.title,
    text: document.body.innerText.replace(/^(\s*\r\n){2,}/,'\r\n'),
  };

  const port = chrome.runtime.connect({name: 'knockknock'});
    
  const resetIdleTimer = ()=> {
    if(SCRIPT_KILLED)return;
    clearTimeout(timer);
    if(idle){
      idle = false;
      port.postMessage({idle});
    }
    timer = setTimeout(setIdle,3000)
  }
  const setIdle = () => {
    if(SCRIPT_KILLED)return;
    idle = true;
    port.postMessage({idle});
  }
 
  port.postMessage({pageData});
  document.body.addEventListener('mousemove',resetIdleTimer);
  document.addEventListener('scroll',resetIdleTimer);

  port.onDisconnect.addListener(()=>{
    console.log('disconnected from background script')
    document.body.removeEventListener('mousemove',resetIdleTimer);
    document.removeEventListener('scroll',resetIdleTimer);
    SCRIPT_KILLED = true;
  })
    
}

