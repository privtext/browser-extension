
function pageCompleateListener(e){
  if(detectDriver() == 'chrome'){
    chrome.tabs.executeScript(e.tabId, { file: 'js/vendor/jquery-1.11.3.min.js' });
    chrome.tabs.executeScript(e.tabId, { file: 'js/extension-lib.js' });
    chrome.tabs.executeScript(e.tabId, { file: 'js/privtext-api.js' });
    chrome.tabs.executeScript(e.tabId, { file: 'js/page-init.js' });
  } else if (detectDriver() == 'browser'){
    browser.tabs.executeScript(e.tabId, { file: 'js/vendor/jquery-1.11.3.min.js' });
    browser.tabs.executeScript(e.tabId, { file: 'js/extension-lib.js' });
    browser.tabs.executeScript(e.tabId, { file: 'js/privtext-api.js' });
    browser.tabs.executeScript(e.tabId, { file: 'js/page-init.js' });
  }
}

if(detectDriver() == 'chrome'){
  chrome.webNavigation.onCompleted.addListener(pageCompleateListener);
} else if (detectDriver() == 'browser'){
  browser.webNavigation.onCompleted.addListener(pageCompleateListener);
}