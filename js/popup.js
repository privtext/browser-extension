(function(){

  var _from_service = null;

  var btnOpenReadNoteBlock = document.getElementById('open_note_url_form');
  var formReadNoteBlock = document.getElementById('note_url_form_block');
  var formReadNote = document.getElementById('note_url_form');
  var btnOpenCreateNoteTab = document.getElementById('open_createnote_tab');

  var btnOpenSettingsTab = document.getElementById('open_settings');

  btnOpenSettingsTab.onclick = function(e){
    e.preventDefault();
    chrome.tabs.create({"url": './settings.html'});  
  }

  btnOpenCreateNoteTab.onclick = function(){
    chrome.tabs.create({"url": './create-note.html#'+_from_service});  
  }

  btnOpenReadNoteBlock.onclick = function(){
    formReadNoteBlock.style.display = "block";
  }

  formReadNote.onsubmit = function(){
    var url = document.getElementById('read_noteurl').value;
    url = url.replace(/^https?:\/\//i, '')
    var note = url.replace(/^privtext\.com\/?/i, '')
    if (!note){
      return;
    }

    if(detectDriver() == 'chrome'){
      chrome.tabs.create(
        { url: 'read-note.html', active: false, selected: false},
        function(tab) {
          var getResponse = function(response) {
            if(response == note){
              chrome.tabs.update(tab.id, {active: true, selected: true}, (tab) => { });
            }
          }
          var handler = function(tabId, changeInfo) {
            if(tabId === tab.id && changeInfo.status === "complete"){
              chrome.tabs.onUpdated.removeListener(handler);
              chrome.tabs.sendMessage(tabId, {url: 'read-note.html', data: {'note':note}}, getResponse);
            }
          }
          chrome.tabs.onUpdated.addListener(handler);
          chrome.tabs.sendMessage(tab.id, {url: 'read-note.html', data: {'note':note}}, getResponse);
        }
      ); 
    } else if(detectDriver() == 'browser'){
      creating = browser.tabs.create({ url: 'read-note.html', active: false/*, selected: false*/});
      creating.then(
        function(tab) {
          var getResponse = function(response) {
            if(response == note){
              browser.tabs.update(tab.id, {active: true/*, selected: true*/}, (tab) => { });
            }
          }
          var handler = function(tabId, changeInfo) {
            if(tabId === tab.id && changeInfo.status === "complete"){
              browser.tabs.onUpdated.removeListener(handler);
              browser.tabs.sendMessage(tabId, {url: 'read-note.html', data: {'note':note}}, getResponse);
            }
          }
          browser.tabs.onUpdated.addListener(handler);
          browser.tabs.sendMessage(tab.id, {url: 'read-note.html', data: {'note':note}}, getResponse);
        },
        function(){ /* pass */ });
    }

    return false;
  }


  document.getElementById('buttonClearAllIgnoredForHost').onclick = function(event){
    if (event.which !== 1){ return; }
    var runCode = "(function(){var hostname = document.location.host.toLowerCase(); saveDisabledInputs(hostname, []); disableInputs = loadDisabledInputs(hostname); privtextInitTextareas();})()"
    if(detectDriver() == 'chrome'){
        chrome.windows.getCurrent({}, function (wnd){
          chrome.tabs.query({'windowId':wnd.id,'active':true, 'lastFocusedWindow': true},async function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.executeScript(tabId, {
                code: runCode
            });
            document.getElementById('blockedInputs').style.display = "none";
          });
        })
    } else {
      var gettingCurrent = browser.windows.getCurrent({})
      var querying = browser.tabs.query({'windowId':gettingCurrent.id,'active':true, 'lastFocusedWindow': true});
      querying.then(
        function(tab) {
          var tabId = tab[0].id;
          browser.tabs.executeScript(tabId, {
              code: runCode
          });
          document.getElementById('blockedInputs').style.display = "none";
        },
        function(){ /* pass */ });
    }

  }


  if(detectDriver() == 'chrome'){
      chrome.windows.getCurrent({}, function (wnd){
        chrome.tabs.query({'windowId':wnd.id,'active':true, 'lastFocusedWindow': true},async function(tabs) {
          var tablink = tabs[0].url;
          var domain = extractHostname(tablink)

          _from_service = domain;

          var disabledDomainList = loadDisabledHosts();

          var domainIsBlocked = disabledDomainList.includes(domain);
          var activeBlock = document.getElementById( domainIsBlocked ? 'blocked' : 'nonBlocked' );
          activeBlock.style.display = "block";

          if(!domainIsBlocked){
            /**/
            var tabId = tabs[0].id;
            var getResponse = function(response) {
              if(response == domain+'_has'){
                document.getElementById('blockedInputs').style.display = "block";
              }
            }
            var handler = function(tabId, changeInfo) {
              if(tabId === tabId && changeInfo.status === "complete"){
                chrome.tabs.onUpdated.removeListener(handler);
                chrome.tabs.sendMessage(tabId, {url: tablink, data: {'action':'detect_blocked_texts'}}, getResponse);
              }
            }
            chrome.tabs.onUpdated.addListener(handler);
            chrome.tabs.sendMessage(tabId, {url: tablink, data: {'action':'detect_blocked_texts'}}, getResponse);
            /**/
          }
        });
      })
  } else {
    var gettingCurrent = browser.windows.getCurrent({})
    var querying = browser.tabs.query({'windowId':gettingCurrent.id,'active':true, 'lastFocusedWindow': true});
    querying.then(
      function(tab) {
        var tablink = tab[0].url;
        var domain = extractHostname(tablink)

        _from_service = domain;

        var disabledDomainList = loadDisabledHosts();

        var domainIsBlocked = disabledDomainList.includes(domain);
        var activeBlock = document.getElementById( domainIsBlocked ? 'blocked' : 'nonBlocked' );
        activeBlock.style.display = "block";

        if(!domainIsBlocked){
          /**/
          var tabId = tab[0].id;
          var getResponse = function(response) {
            if(response == domain+'_has'){
              document.getElementById('blockedInputs').style.display = "block";
            }
          }
          var handler = function(tabId, changeInfo) { console.log('send', tabId, changeInfo)
            if(tabId === tabId && changeInfo.status === "complete"){
              browser.tabs.onUpdated.removeListener(handler);
              browser.tabs.sendMessage(tabId, {url: tablink, data: {'action':'detect_blocked_texts'}}, getResponse);
            }
          }
          browser.tabs.onUpdated.addListener(handler);
          browser.tabs.sendMessage(tabId, {url: tablink, data: {'action':'detect_blocked_texts'}}, getResponse);
          /**/
        }

      },
      function(){ /* pass */ });

  }

})();