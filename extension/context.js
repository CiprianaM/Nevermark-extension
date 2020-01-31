const contextMenuItem = {
  "id": "searchHistory",
  "title": "Search Browsing History",
  "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === "searchHistory" && clickData.selectionText) {
    chrome.tabs.executeScript({code: 'getSelection().toString()'}, data => {
      chrome.tabs.create({"url":"http://192.168.56.1:3000/search?q=" + data[0]});
    });
  }
});
