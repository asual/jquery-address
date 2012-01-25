asyncTest('Value test', function() {
    setTimeout(function() {
        $.address.value('/test');
        equals($.address.value(), '/test');
        setTimeout(function() {
            window.history.back();
        }, 500);
        start();
    }, 1000);
});

asyncTest('History test', function() {
    setTimeout(function() {
        equals($.address.value(), '/');
        setTimeout(function() {
            window.history.forward();
        }, 500);
        start();
    }, 1000);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        equals($.address.value(), '/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 1000);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/test/1/2/');
        same($.address.pathNames(), ['test', '1', '2']);
        start();
    }, 1000);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/');
        same($.address.pathNames(), []);
        start();
    }, 1000);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 1000);
});

asyncTest('Query test', function() {
    setTimeout(function() {
        $.address.queryString('p=0');
        equals($.address.value(), '/test?p=0');
        equals($.address.path(), '/test');
        equals($.address.queryString(), 'p=0');
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.parameter('a', null);
        $.address.parameter('p', 1);
        equals($.address.value(), '/test?p=1');
        equals($.address.queryString(), 'p=1');
        equals($.address.parameter('p'), '1');
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.parameter('p', 2, true);
        equals($.address.value(), '/test?p=1&p=2');
        equals($.address.queryString(), 'p=1&p=2');
        same($.address.parameter('p'), ['1','2']);
        same($.address.parameterNames(), ['p']);
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .queryString('')
            .parameter('p', 1, true)
            .parameter('p', 2)
            .parameter('p', 3, true)
            .parameter('s', 1)
            .parameter('s', 2, true)
            .parameter('s', 3)
            .parameter('t', 0)
            .parameter('t', null)
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/test?p=2&p=3&s=3');
        same($.address.parameter('p'), ['2','3']);
        equals($.address.parameter('s'), 3);
        same($.address.parameterNames(), ['p','s']);
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .parameter('p1', encodeURIComponent('a#b'))
            .parameter('p2', encodeURIComponent('a&b'))
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/?p1=' + encodeURIComponent('a#b') + '&p2=' + encodeURIComponent('a&b'));            
        equals($.address.parameter('p1'), encodeURIComponent('a#b'));
        equals($.address.parameter('p2'), encodeURIComponent('a&b'));
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .parameter('p1', encodeURIComponent('a=4&b=5'))
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/?p1=' + encodeURIComponent('a=4&b=5'));            
        equals($.address.parameter('p1'), encodeURIComponent('a=4&b=5'));
        equals(decodeURIComponent($.address.parameter('p1')), 'a=4&b=5');
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .parameter('p', encodeURIComponent('a b +ċ'))
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/?p=' + encodeURIComponent('a b +ċ'));
        equals($.address.parameter('p'), encodeURIComponent('a b +ċ'));
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .parameter('p', encodeURIComponent('a+b ç=2'))
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/?p=' + encodeURIComponent('a+b ç=2'));
        equals($.address.parameter('p'), encodeURIComponent('a+b ç=2'));
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .queryString($.param({start: 0, order: 'index0'}))
            .autoUpdate(true)
            .update();
        equals($.address.parameter('start'), 0);
        equals($.address.parameter('order'), 'index0');
        start();
    }, 1000);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .value('/')
            .parameter('data', encodeURIComponent($.param({start: 1, order: 'index1'})))
            .autoUpdate(true)
            .update();
        equals($.address.parameter('data'), encodeURIComponent($.param({start: 1, order:'index1'})));
        same($.address.parameterNames(), ['data']);
        start();
    }, 1000);
});

asyncTest('Hash test with parameters', function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.queryString('p=2&p=3&s=3');
        $.address.hash('comment-2');
        equals($.address.value(), '/test?p=2&p=3&s=3#comment-2');
        equals($.address.path(), '/test');
        equals($.address.parameter('p').toString(), '2,3');
        equals($.address.parameter('s').toString(), 3);
        equals($.address.hash(), 'comment-2');
        same($.address.parameterNames(), ['p','s']);
        start();
    }, 1000);
});

asyncTest('Hash test', function() {
    setTimeout(function() {
        $.address.value('/test');
        $.address.hash('comment-1');
        equals($.address.value(), '/test#comment-1');
        equals($.address.path(), '/test');
        equals($.address.hash(), 'comment-1');
        start();
    }, 1000);
});

asyncTest('Character test', function() {
    setTimeout(function() {
        $.address.value(encodeURI('/børn?тест=символ'));
        equals($.address.path(), encodeURI('/børn'));
        equals($.address.parameter(encodeURIComponent('тест')), encodeURIComponent('символ'));
        start();
    }, 1000);
});

asyncTest('Character test', function() {
    setTimeout(function() {
        $.address.value('/Test Encoding');
        equals($.address.value(), '/Test Encoding');
        start();
    }, 1000);
});

asyncTest('Character test', function() {
    setTimeout(function() {
        var str = encodeURIComponent('Test mit Sonderzeichen + - / = ÖÄÜ und Leerzeichen');
        $.address.value(str);
        $.address.queryString('str=' + str);
        equals($.address.value(), '/' + str + '?str=' + str);
        equals($.address.path(), '/' + str);
        equals($.address.queryString(), 'str=' + str);
        equals($.address.parameter('str'), str);
        start();
    }, 1000);
});

asyncTest('Value test', function() {
    setTimeout(function() {
        $.address.value(1);
        equals($.address.value(), '/1');
        start();
    }, 1000);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.value('test');
        equals($.address.value(), '/test');
        start();
    }, 1000);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.value('?p=1&p=2');
        equals($.address.value(), '/?p=1&p=2');
        equals($.address.path(), '/');
        equals($.address.queryString(), 'p=1&p=2');
        equals($.address.parameter('p').toString(), '1,2');
        start();
    }, 1000);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.strict(false);
        $.address.value('test');
        equals($.address.value(), 'test');
        start();
    }, 1000);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.strict(false);
        $.address.value('?p=1&p=2');
        equals($.address.value(), '?p=1&p=2');
        equals($.address.path(), '');
        equals($.address.queryString(), 'p=1&p=2');
        equals($.address.parameter('p').toString(), '1,2');
        start();
    }, 1000);
});

setTimeout(function() {
    $.address.value('/');
}, 30000);