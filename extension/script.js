const test = document.createElement('script');

test.src = chrome.runtime.getURL('script.js');
test.onload = () => {
  alert('Hello');
}

(document.head || document.documentElement).appendChild(test);
