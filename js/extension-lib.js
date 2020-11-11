
function detectDriver(){
    var nAgt = navigator.userAgent;
    var verOffset;
    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
     return 'chrome';
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
     return 'chrome';
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
     return 'chrome'
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
     return 'chrome';
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
     return 'browser';
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
     return 'browser';
    }
    return 'browser';
}

function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) { hostname = url.split('/')[2];
    } else { hostname = url.split('/')[0]; }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    hostname = hostname.replace(new RegExp('^www\.','i'), '')
    return hostname.toLowerCase();
}


function readdata(name){
    return window.localStorage.getItem(name);
}

function writedata(name, data){
  window.localStorage.setItem(name, data);
}

function loadDisabledHosts(){
    var disabled_domains = readdata('disabled_domains');
    if (!disabled_domains){
        disabled_domains = '[]'
    }
    return JSON.parse(disabled_domains)
}

function saveDisabledHosts(data){
    writedata('disabled_domains', JSON.stringify(data));
}

function getInputKey(tag){
  return tag.tagName+'#'+(tag.getAttribute('id')?tag.getAttribute('id'):'')+'[name="'+(tag.getAttribute('name')?tag.getAttribute('name'):'')+'"]'
}

function loadDisabledInputs(domain){
  var data = readdata('di_'+domain);
  if (!data){
    data = '[]'
  }
  return JSON.parse(data)
}

function saveDisabledInputs(domain, data){
  var l = data.length
  var dl = readdata('did_domains_list')
  if(!dl){ dl = '[]' }
  dl = JSON.parse(dl)
  var di = dl.indexOf(domain)
  if(di == -1 && l > 0){
    dl.push(domain)
    writedata('did_domains_list', JSON.stringify(dl))
  }else if(di > -1 && l == 0){
    dl = [].concat(dl.slice(0, di), dl.slice(di+1, dl.lengt))
    writedata('did_domains_list', JSON.stringify(dl))
  }
  writedata('di_'+domain, JSON.stringify(data));
}