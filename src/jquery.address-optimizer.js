/*
 * jQuery Address Plugin v${version}
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009 Rostislav Hristov
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: ${timestamp}
 */
(function() {

    var _execute = function(str) {
        (new Function(str.replace(/^([^(]*)\(([^)]*)\);?$/, '$1($2);')))();
    }
    
    var _redirect = function(address, base) {
        var value = _l.href.split(_l.hostname)[1].replace(base, '');
        alert(value);
        return;
        if (address != '/' && (!_hash || _index == _l.href.length - 1) && (value != '' && value != '/')) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    try {
                        xhr = new ActiveXObject('Msxml2.XMLHTTP');
                    } catch(e) {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                } catch(e) {}
            }
            if (xhr) {
                xhr.open('get', ((typeof base != UNDEFINED) ? base : '') + '/?' + address + (_l.hash != '' ? '&hash=' + _l.hash.replace(/^#/, '') : ''), false);
                xhr.setRequestHeader('Content-Type', 'application/x-jquery-address');
                xhr.send('');
                _execute(xhr.responseText);
            }
        }
    }
    
    var UNDEFINED = 'undefined', 
        _url,
        _l = location,
        _n = navigator,        
        _index = _l.href.indexOf('#'),
        _hash = (_index != -1),
        _opts = {};
    
    var _searchScript = function(el) {
        for (var i = 0, l = el.childNodes.length, s; i < l; i++) {
            if (el.childNodes[i].src)
                _url = String(el.childNodes[i].src);
            _searchScript(el.childNodes[i])
        }
    }
    
    _searchScript(document);
    var qi = _url.indexOf('?');
    if (_url && qi > -1) {
        var param, params = _url.substr(qi + 1).split('&');
        for (var i = 0, p; p = params[i]; i++) {
            param = p.split('=');
            if (/^(base|address)$/.test(param[0]))
                _opts[param[0]] = unescape(param[1]);
        }
    }
    
    if (_hash && (_index - (_l.href.indexOf(_l.pathname, _l.protocol.length + 2) + 
        _l.pathname.indexOf(_opts.base) + _opts.base.length)) > 1)      
        _hash = false;
    
    _redirect(_opts.address, _opts.base);
    
})();