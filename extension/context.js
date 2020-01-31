const contextMenuItem = {
  'id' : 'searchHistory',
  'title' : 'Search Browsing History',
  'contexts' : ['selection']
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'searchHistory' && clickData.selectionText) {
    chrome.tabs.executeScript({code : 'getSelection().toString()'},data => {
      chrome.tabs.create({'url' : 'http://localhost:3001/search/' + data[0]});
    });
  }
});
