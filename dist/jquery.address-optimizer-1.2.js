/*
 * jQuery Address Plugin v1.2
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009-2010 Rostislav Hristov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2010-03-31 00:10:37 +0300 (Wed, 31 Mar 2010)
 */
(function() {

    var _window = function() { 
            try {
                return top.document !== undefined ? top : window;
            } catch (e) { 
                return window;
            }
        },
        _search = function(el) {
            var url, s;
            for (var i = 0, l = el.childNodes.length; i < l; i++) {
                if (el.childNodes[i].src) {
                    url = String(el.childNodes[i].src);
                }
                s = _search(el.childNodes[i]);
                if (s) {
                    url = s;
                }
            }
            return url;
        },
        UNDEFINED = 'undefined', 
        _url = _search(document),
        _qi = _url ? _url.indexOf('?') : -1,
        _t = _window(),
        _d = _t.document,
        _l = _t.location,
        _n = navigator,
        _index = _l.href.indexOf('#'),
        _hash = (_index != -1),
        _opts = {};
    
    if (_url && _qi != -1) {
        var param, params = _url.substr(_qi + 1).split('&');
        for (var i = 0; i < params.length; i++) {
            param = params[i].split('=');
            if (/^(base|address)$/.test(param[0])) {
                _opts[param[0]] = unescape(param[1]);
            }
        }
    }
    
    if (_hash && (_index - (_l.href.indexOf(_l.pathname, _l.protocol.length + 2) + 
        _l.pathname.indexOf(_opts.base) + _opts.base.length)) > 1) {
        _hash = false;
    }
    
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
            } catch(ae) {}
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