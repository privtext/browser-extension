
// var hostname = extractHostname(document.location)
var hostname = document.location.host.toLowerCase()

if(detectDriver() == 'chrome'){
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request['data']['action'] && request['data']['action'] == 'detect_blocked_texts'){
        var disableInputs = loadDisabledInputs(hostname);
        if(disableInputs.length){
          sendResponse(hostname+'_has');
        }
      }
    });
} else if (detectDriver() == 'browser'){
  browser.runtime.onMessage.addListener(request => {
    if(request['data']['action'] && request['data']['action'] == 'detect_blocked_texts'){
      var disableInputs = loadDisabledInputs(hostname);
      if(disableInputs.length){
        return Promise.resolve(hostname+'_has');
      }
    }
    return Promise.resolve(hostname+'_no');
  });
}

var privtextInitTextareas = function(){
  var BUFFER_HISTORY = {}
  var disableInputs = loadDisabledInputs(hostname);

  var init_textarea = function(t_el){
    i_key = getInputKey(t_el);
    if(disableInputs.includes(i_key)){ return; }

    // console.log(i_key, disableInputs)

    if(t_el.getAttribute("data-privtext_init") == 1){ return; }
    t_el.parentElement.style.position = "relative";

    var buffID = Math.random().toString(36).replace(/[^a-z]+/g, '');
    t_el.setAttribute('data-privtext_buff', buffID)
    BUFFER_HISTORY[buffID] = []

    var d = document.createElement("DIV");
    d.style.display = 'inline-block';
    d.style.position = 'absolute';
    d.style.top = '5px';
    d.style.right = '5px';
    d.style.zIndex = '99999';
    d.style.whiteSpace = 'nowrap';
    d.style.paddingLeft = '20px';


    var m0= document.createElement("DIV");
    m0.style.width = '15px';
    m0.style.position = 'absolute';
    m0.style.left = '2.5px';
    m0.style.top = '2px';
    m0.style.bottom = '0';
    m0.style.cursor = 'move'

    var m1= document.createElement("SPAN");
    m1.style.position = 'absolute';
    m1.style.display = 'inline-block';
    m1.style.width = '100%';
    m1.style.height = '5px';
    m1.style.background = '#bfbfbf';
    m1.style.top = '4px';

    var m2= document.createElement("SPAN");
    m2.style.position = 'absolute';
    m2.style.display = 'inline-block';
    m2.style.width = '100%';
    m2.style.height = '5px';
    m2.style.background = '#bfbfbf';
    m2.style.top = '12px';

    var m3= document.createElement("SPAN");
    m3.style.position = 'absolute';
    m3.style.display = 'inline-block';
    m3.style.width = '100%';
    m3.style.height = '5px';
    m3.style.background = '#bfbfbf';
    m3.style.top = '20px';

    m0.appendChild(m1)
    m0.appendChild(m2)
    m0.appendChild(m3)
    d.appendChild(m0)


    m0.addEventListener('mousedown', function(event){

        if (event.which !== 1){ return; }

        var self = d;
        
        var sw = $($(self).find('button').get(0)).outerWidth() + 
                  $($(self).find('button').get(1)).outerWidth() + 
                  $($(self).find('button').get(2)).outerWidth() +
                  20 /* 20px of padding */ ;

        var sh = $(self).outerHeight();
        
        document.onmouseup = function(){
            document.onmouseup = null;
            document.onmousemove = null;
        };

        // document.onmousemove = function(e) {
        //     var y = self.offsetTop + e.movementY
        //     var x = self.offsetLeft + e.movementX

        //     if(x < 0){ x = 0; }
        //     if(y < 0){ y = 0; }

        //     var pw = $(self).parent().outerWidth();
        //     var ph = $(self).parent().outerHeight();

        //     if(x+sw > pw){ x = pw - sw; }
        //     if(y+sh > ph){ y = ph - sh; }

        //     self.style.top = y + "px";
        //     self.style.left = x + "px";
        // }

        document.onmousemove = function(e) {
            var x = self.offsetLeft + e.movementX
            var y = self.offsetTop + e.movementY

            var pw = $(t_el).outerWidth();
            var ph = $(t_el).outerHeight();

            if(x+sw > pw){ x = pw - sw; }
            if(y+sh > ph){ y = ph - sh; }

            if(x < 0){ x = 0; }
            if(y < 0){ y = 0; }

            self.style.left = x + "px";
            self.style.top = y + "px";
        }
    });

    var b = document.createElement("BUTTON");
    b.setAttribute('id', 'privtext_do_'+buffID)
    b.disabled = true;
    b.style.color = '#aaa';
    b.style.display = 'inline-block';
    b.type = 'button';
    b.style.marginRight = '0';
    b.style.paddingTop = '5px';
    b.style.paddingBottom = '5px';
    b.style.paddingLeft = '15px';
    b.style.paddingRight = '15px';
    
    b.style.fontFamily = '"Open Sans", sans-serif'
    b.style.fontWeight = '400'
    b.style.fontSize = '12px';
    
    b.style.height = '32px';
    
    b.style.border = '1px solid #aaa;';
    b.style.outline = '0';
    b.style.minWidth = '120px';
    b.style.textAlign = 'center';
    b.appendChild(document.createTextNode('PrivText'));
    b.addEventListener('click', function(event){
      if (event.which !== 1){ return; }

      var ssi = t_el.selectionStart;
      var fsi = t_el.selectionEnd;
      var std = t_el.value.substring(ssi, fsi);

      if(std.length == 0){
        std = t_el.value;
        ssi = 0;
        fsi = std.length;
      }

      if(std.length == 0){
        return;
      }

      t_el.readOnly = true
      t_el.disabled = true

      var lPosition = -1, lData = ['|', '/', '&ndash;', '\\', '|', '/', '&ndash;', '\\'], lMaxPos = 7;
      var sbhtml = document.getElementById('privtext_do_'+buffID).innerHTML
      var interLoad = setInterval(function(){
        lPosition += 1;
        if(lPosition > lMaxPos){ lPosition = 0; }
        document.getElementById('privtext_do_'+buffID).innerHTML='Loading...['+lData[lPosition]+']';
      }, 150)

      var bfv = t_el.value

      document.getElementById('privtext_do_'+buffID).disabled = true
      document.getElementById('privtext_do_'+buffID).style.color = '#aaa';

      document.getElementById('privtext_buff_'+buffID).disabled = true
      document.getElementById('privtext_buff_'+buffID).style.color = '#aaa';

      document.getElementById('privtext_hide_'+buffID).disabled = true
      document.getElementById('privtext_hide_'+buffID).style.color = '#aaa';

      setTimeout(function(){
        var chiper = PrivtextExt.encyptNote(std)
        var proof = PrivtextExt.getProof()
        var note = PrivtextExt.saveNote(chiper.data, proof)
        var noteurl = PrivtextExt.buildUrl(note.url, chiper.password)

        BUFFER_HISTORY[buffID].push({'url':noteurl, 'text': std})

        t_el.value = bfv.substr(0, ssi) + ' '+noteurl+' ' + bfv.substr(fsi, bfv.length);

        setTimeout(function(){
          clearInterval(interLoad);
          document.getElementById('privtext_do_'+buffID).innerHTML = sbhtml;

          t_el.readOnly = false
          t_el.disabled = false

          document.getElementById('privtext_do_'+buffID).disabled = false
          document.getElementById('privtext_do_'+buffID).style.color = '#000';

          document.getElementById('privtext_buff_'+buffID).disabled = false
          document.getElementById('privtext_buff_'+buffID).style.color = '#000';

          document.getElementById('privtext_hide_'+buffID).disabled = false
          document.getElementById('privtext_hide_'+buffID).style.color = '#000';

        }, 100)
      }, 1000)
      
    });
    d.appendChild(b)

    var r = document.createElement("BUTTON");
    r.setAttribute('id', 'privtext_buff_'+buffID)
    r.style.display = 'inline-block';
    r.type = 'button';
    // r.style.paddingTop = '5px';
    // r.style.paddingBottom = '5px';
    // r.style.paddingLeft = '15px';
    // r.style.paddingRight = '15px';
    
    r.style.fontFamily = '"Open Sans", sans-serif'
    r.style.fontWeight = '400'
    r.style.fontSize = '20px';

    r.style.height = '32px';

    r.style.border = '1px solid #aaa;';
    r.style.outline = '0';
    r.style.lineHeight = '20px';
    r.style.paddingTop = '1px';
    r.style.paddingBottom = '7px';
    r.style.paddingLeft = '10px';
    r.style.paddingRight = '10px';
    r.style.textAlign = 'center';

    r.disabled = true;
    r.style.color = '#aaa';

    // r.appendChild(document.createTextNode('⎌'));
    r.innerHTML = '&#9100;'
    r.addEventListener('click', function(event){
      if (event.which !== 1){ return; }
      var h = BUFFER_HISTORY[buffID].pop()
      if(h){
        t_el.value = t_el.value.replace(h.url, h.text)
        if(BUFFER_HISTORY[buffID].length == 0){
          document.getElementById('privtext_buff_'+buffID).disabled = true
          document.getElementById('privtext_buff_'+buffID).style.color = '#aaa';
        }
      }
      
    });
    d.appendChild(r)


    var x = document.createElement("BUTTON");
    x.setAttribute('id', 'privtext_hide_'+buffID)
    x.style.disabled = true;
    x.style.display = 'inline-block';
    x.type = 'button';
    // x.style.paddingTop = '5px';
    // x.style.paddingBottom = '5px';
    // x.style.paddingLeft = '15px';
    // x.style.paddingRight = '15px';
    
    x.style.fontFamily = '"Open Sans", sans-serif'
    x.style.fontWeight = '400'
    x.style.fontSize = '20px';

    x.style.height = '32px';
    
    x.style.border = '1px solid #aaa;';
    x.style.outline = '0';
    x.style.lineHeight = '20px';
    x.style.paddingTop = '1px';
    x.style.paddingBottom = '7px';
    x.style.paddingLeft = '10px';
    x.style.paddingRight = '10px';
    x.style.textAlign = 'center';
    // x.appendChild(document.createTextNode('⨉'));
    x.innerHTML = '&#10761;'
    x.addEventListener('click', function(event){
      if (event.which !== 1){ return; }
      var disableInputs = loadDisabledInputs(hostname);
      disableInputs.push(i_key)
      saveDisabledInputs(hostname, disableInputs)
      d.remove();
      t_el.removeAttribute("data-privtext_init");
      t_el.removeAttribute('data-privtext_buff')
    });
    d.appendChild(x)

    t_el.parentElement.insertBefore(d, t_el)

    t_el.setAttribute("data-privtext_init", "1");

    document.getElementById('privtext_do_'+buffID).disabled = false
    document.getElementById('privtext_do_'+buffID).style.color = '#000';

    document.getElementById('privtext_hide_'+buffID).disabled = false
    document.getElementById('privtext_hide_'+buffID).style.color = '#000';
  }

  var textarea_els = document.getElementsByTagName("TEXTAREA");
  for(var i=0;i<textarea_els.length;i++){
      var t_el = textarea_els[i];
      if(t_el.readOnly || t_el.disabled){ continue; }
      init_textarea(t_el, disableInputs);
  }
}

privtextInitTextareas();