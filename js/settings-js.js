(function(){
    function templDomainLine(domain){
        return '<li style="margin: 10px 5px;border-bottom: 1px #e0e0e0 solid;line-height: 28px;height: 28px;">' +
                  '<span style="display: inline-block; min-width: 250px; float: left;">'+domain+'</span>' +
                  '<button type="button" class="btn btn-outline-danger btn-sm btnRemoveDomainBlocked" data-domain="'+domain+'" style="float: right;">x</button>' +
                '</li>'
    }

    var domains = loadDisabledHosts();
    for(var i=0;i<domains.length;i++){
        $('#hostlist_settings').append(templDomainLine(domains[i]));
    }

    $('.btnRemoveDomainBlocked').click(function(){
        var seft = this;
        var domain = $(seft).attr('data-domain');

        const index = domains.indexOf(domain);
        if (index > -1) { domains.splice(index, 1); }
        saveDisabledHosts(domains)
        
        $(seft).parent().remove();
    });

})();