/*
 * jQuery Address Plugin v1.1
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009 Rostislav Hristov
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-12-08 23:23:05 +0200 (Tue, 08 Dec 2009)
 */
(function() {

	var _getWindow = function() { 
		try {
			return top.document != undefined ? top : window;
		} catch (e) { 
			return window; 
		}
	};
    
    var _searchScript = function(el) {
        if (el.childNodes) {
            for (var i = 0, l = el.childNodes.length, s; i < l; i++) {
                if (el.childNodes[i].src)
                    _url = String(el.childNodes[i].src);
                if (s = _searchScript(el.childNodes[i]))
                    return s;
            }
        }
    };
    
    var UNDEFINED = 'undefined', 
        _url,
        _t = _getWindow(),
        _d = _t.document,
        _l = _t.location,
        _n = navigator,
        _index = _l.href.indexOf('#'),
        _hash = (_index != -1),
        _opts = {};
    
    _searchScript(document);
    var _qi = _url ? _url.indexOf('?') : -1;
    if (_qi != -1) {
        var param, params = _url.substr(_qi + 1).split('&');
        for (var i = 0, p; p = params[i]; i++) {
            param = p.split('=');
            if (/^(base|address)$/.test(param[0]))
                _opts[param[0]] = unescape(param[1]);
        }
    }
    
    if (_hash && (_index - (_l.href.indexOf(_l.pathname, _l.protocol.length + 2) + 
        _l.pathname.indexOf(_opts.base) + _opts.base.length)) > 1)
        _hash = false;
    
    var value = _l.href.split(_l.hostname)[1].replace(_opts.base, '');
    if (_opts.address != '/' && (!_hash || _index == _l.href.length - 1) && (value != '' && value != '/')) {
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
            xhr.open('get', ((typeof _opts.base != UNDEFINED) ? _opts.base : '') + '/?' + _opts.address + (_l.hash != '' ? '&hash=' + _l.hash.replace(/^#/, '') : ''), false);
            xhr.setRequestHeader('Content-Type', 'application/x-address');
            xhr.send('');
            (new Function(xhr.responseText.replace(/^([^(]*)\(([^)]*)\);?$/, '$1($2);')))();
        }
    } else if (/webkit/i.test(_n.userAgent.toLowerCase()) && _d.referrer == _l.href.replace(/#\/?/, '')) {
            _l.reload();
    }
    
})();