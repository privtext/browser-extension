
(function(){
  var domain = window.location.hash.slice(1,);
  var disabled_domains = loadDisabledHosts();

  $('.btnNewAdain').click(function(e){
    e.preventDefault();
    window.location.reload();
  });

  const index = disabled_domains.indexOf(domain);
  if (index > -1 && domain.length){
    $('#processButtons').hide();
    $('#blockedInfo').show();
  } else {
    $('#processButtons').show();

    if(domain.length){
      $('.btnDisableService').click(function(){
        var i = disabled_domains.indexOf(domain);
        if (i == -1){
          disabled_domains.push(domain);
        }
        saveDisabledHosts(disabled_domains);

        $('#processButtons').hide();
        $('#blockedInfo').show();
      });
    }
    else{
      $('#blockButton').hide();
    }
  }

})();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request['data']['note']){
      $('#privdata').val(request['data']['note'])
    }
    if(request['data']['rid']){
      sendResponse(request['data']['rid'])
    }
  });



widgetPrivText.init(widgetPrivText.MODE_ENCODE, '#privdata', '#browser-view', '#createButton');
widgetPrivText.setopt('switch_selector_start', '.result-hide');
widgetPrivText.setopt('switch_selector_result', '.result-link');
widgetPrivText.setopt('proof_result_time_selector', '#timer');
widgetPrivText.setopt('proof_result_handler',function(proof){ $('#proof').val(proof); });
widgetPrivText.run();