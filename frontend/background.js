let color = '#6633a3';
let current_user

const uploadData=(new_data)=>{
  fetch('http://localhost:5000/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(new_data),
  })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
}

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
      uploadData(new_data)
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
      const new_data = {
        url: change.url,
        user_email: current_user.email,
        timestamp: Date.now()
      }
      uploadData(new_data)
    }
  });
});
