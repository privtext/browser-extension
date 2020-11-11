/* */
$('#timelive').change(function(){
  describeSelected(this);
  /*$('.note-delete-message').hide();
  $('.note-delete-message-'+$(this).val()).show();*/
});
/* */

$('.js-popupQRCode-btn').on('click', function(e) {
        e.preventDefault();
        
        el = document.getElementById("browser-view");
        openPopupQRCode(null, el.value);

        return false;
    });

/* */
$('.js-copyToBuffer').click(function(e){
  e.preventDefault();
  // document.getElementById("privdata").select();


  // document.getElementById("privdata").select();
  // document.execCommand('copy');

  el = document.getElementById("privdata");

  // handle iOS as a special case
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

      // save current contentEditable/readOnly status
      var editable = el.contentEditable;
      var readOnly = el.readOnly;

      // convert to editable with readonly to stop iOS keyboard opening
      el.contentEditable = true;
      el.readOnly = true;

      // create a selectable range
      var range = document.createRange();
      range.selectNodeContents(el);

      // select the range
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);

      // restore contentEditable/readOnly to original state
      el.contentEditable = editable;
      el.readOnly = readOnly;
  }
  else {
      el.select();
  }

  document.execCommand('copy');

  

  return false;
});

/* */
function openPopupQRCode(err, textContent) {
  var popup = $('.js-popupQRCode'),
      bgPopup = $('.underBg'),
      ml = popup.width()/(-2),
      mt = popup.height()/(-2),
      descError = popup.find('.describeError');

  popup.css({
      'margin-top': mt - 100,
      'margin-left': ml
  });

  if(err) {
      descError.show();
  } else {
      descError.removeAttr('style');
  }

  $(popup).find('.qrcode-canvas').qrcode(

    {
        // render method: 'canvas', 'image' or 'div'
        render: 'image',

        // version range somewhere in 1 .. 40
        minVersion: 1,
        maxVersion: 40,

        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel: 'M',

        // offset in pixel if drawn onto existing canvas
        left: 0,
        top: 0,

        // size in pixel
        size: 250,

        // code color or image element
        fill: '#000',

        // background color or image element, null for transparent background
        background: '#fff',

        // content
        text: textContent,

        // corner radius relative to module width: 0.0 .. 0.5
        radius: 0,

        // quiet zone in modules
        quiet: 0,

        // modes
        // 0: normal
        // 1: label strip
        // 2: label box
        // 3: image strip
        // 4: image box
        mode: 0,

        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,

        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',

        image: null
    }
  );


  // Open Popup
  bgPopup.stop().fadeIn('fast', function() {
      popup.stop().fadeIn('fast');
  });
}


// Close Popup
$('.js-popupQRCode .js-closePopup').on('click', function(e) {
  e.preventDefault();
  closePopup();

  $('.js-popupQRCode').find('.qrcode-canvas').html('');
});
/* */