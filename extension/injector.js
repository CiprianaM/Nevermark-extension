const test = document.createElement('script');

test.src = chrome.extension.getURL('script.js');
(document.head || document.documentElement).appendChild(test);
test.onload = () => {
  test.parentNode.removeChild(test);
}
