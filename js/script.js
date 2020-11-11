
// permissions: "contextMenus"

const CONTEXT_MENU_ID = "PrivText.com";

function clickEvent(info,tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }

  var rid = parseInt(Math.random(10) * 1000000000)
  var note = info.selectionText || info.linkUrl || info.srcUrl
  var domain = extractHostname(info.pageUrl)
  

  if(detectDriver() == 'chrome'){
      chrome.tabs.create(
        { url: 'create-note.html#'+domain, active: false, selected: false},
        function(tab) {
          var getResponse = function(response) {
            if(response == rid){
              chrome.tabs.update(tab.id, {active: true, selected: true}, (tab) => { });
            }
          }
          var handler = function(tabId, changeInfo) {
            if(tabId === tab.id && changeInfo.status === "complete"){
              chrome.tabs.onUpdated.removeListener(handler);
              chrome.tabs.sendMessage(tabId, {url: 'create-note.html#'+domain, data: {'note':note, 'rid':rid}}, getResponse);
            }
          }
          chrome.tabs.onUpdated.addListener(handler);
          chrome.tabs.sendMessage(tab.id, {url: 'create-note.html#'+domain, data: {'note':note, 'rid':rid}}, getResponse);
        }
      );
  } else if (detectDriver() == 'browser') {
      creating = browser.tabs.create({ url: 'create-note.html#'+domain, active: false/*, selected: false*/});
      creating.then(
        function(tab) {
          var getResponse = function(response) {
            if(response == rid){
              browser.tabs.update(tab.id, {active: true/*, selected: true*/}, (tab) => { });
            }
          }

          var handler = function(tabId, changeInfo) {
            if(tabId === tab.id && changeInfo.status === "complete"){
              browser.tabs.onUpdated.removeListener(handler);
              browser.tabs.sendMessage(tabId, {url: 'create-note.html#'+domain, data: {'note':note, 'rid':rid}}, getResponse);
            }
          }

          browser.tabs.onUpdated.addListener(handler);
          browser.tabs.sendMessage(tab.id, {url: 'create-note.html#'+domain, data: {'note':note, 'rid':rid}}, getResponse);
        },
      function(){ /* pass */ });
  }

}


if(detectDriver() == 'chrome'){
  chrome.contextMenus.create({
    title: "PrivText", 
    contexts:["all"],
    id: CONTEXT_MENU_ID
  });
  chrome.contextMenus.onClicked.addListener(clickEvent)
} else if (detectDriver() == 'browser'){
  var context = browser.menus || browser.contextMenus;
  context.create({
    title: "PrivText", 
    contexts:["all"],
    id: CONTEXT_MENU_ID
  });
  context.onClicked.addListener(clickEvent);
}