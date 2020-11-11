
$('.btnReply').click(
  function(){
    $.ajax(
      {
        url: document.location.pathname,
        cache: false,
        method: 'POST',
        data:{ ajax: 1, action: 'get_reply_block' },
        success: function(response){
          var textreply = "> "+($('#privdata').val().replace(new RegExp("\n",'g'),"\n>"))+"\n>\n\n";
          $('.wrapperInside main').html(response);
          $('#privdata').val(textreply);
          if ($(window).width() < 768) {
            $('.mainHeader .js-showSettings').show();
          }
        }
      }
    );
  }
);

/* */

if(detectDriver() == 'chrome'){
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request['data']['note']){
        widgetPrivText.start(request);
        sendResponse(request['data']['note']);
      }
    });
} else if (detectDriver() == 'browser'){
  browser.runtime.onMessage.addListener(request => {
    if(request['data']['note']){
      widgetPrivText.start(request);
    }
    return Promise.resolve(request['data']['note']);
  });
}


widgetPrivText.init(widgetPrivText.MODE_DECODE, '#privdata', null, null);
widgetPrivText.setopt('proof_result_time_selector', '#timer');
widgetPrivText.setopt('proof_result_handler',function(proof){ $('#proof').val(proof); });
widgetPrivText.run();
