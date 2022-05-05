let color = '#6633a3';
let url_data = [];
let current_user

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  chrome.identity.getProfileUserInfo(function(userInfo) {
    current_user = userInfo
  });

  chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
      const new_data = {
        url: tab.url,
        user_email: current_user.email,
        timestamp: Date.now()
      }
      url_data.push(new_data)
    });
    console.log(url_data)
  });

  chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
      const new_data = {
        url: change.url,
        user_email: current_user.email,
        timestamp: Date.now()
      }
      url_data.push(new_data)
    }
    console.log(url_data)
  });
});
