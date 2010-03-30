asyncTest("Value test", function() {
    setTimeout(function() {
        $.address.value('/test');
        equals($.address.value(), '/test');
        setTimeout(function() {
            window.history.back();
        }, 500);
        start();
    }, 1000);
});

asyncTest("History test", function() {
    setTimeout(function() {
        equals($.address.value(), '/');
        setTimeout(function() {
            window.history.forward();
        }, 500);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        equals($.address.value(), '/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/test/1/2/');
        same($.address.pathNames(), ['test', '1', '2']);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/');
        same($.address.pathNames(), []);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 1000);
});

asyncTest("Query test", function() {
    setTimeout(function() {
        $.address.queryString('p=0');
        equals($.address.value(), '/test?p=0');
        equals($.address.path(), '/test');
        equals($.address.queryString(), 'p=0');
        start();
    }, 1000);
});

asyncTest("Parameter test", function() {
    setTimeout(function() {
        $.address.parameter('p', 1);
        equals($.address.value(), '/test?p=1');
        equals($.address.queryString(), 'p=1');
        equals($.address.parameter('p'), '1');
        start();
    }, 1000);
});

asyncTest("Parameter test", function() {
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

asyncTest("Parameter test", function() {
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

asyncTest("Hash test with parameters", function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.queryString('p=2&p=3&s=3');
        $.address.hash('comment-2');
        equals($.address.value(), '/test?p=2&p=3&s=3#comment-2');
        equals($.address.path(), '/test');
        equals($.address.parameter('p').toString(), '2,3');
        equals($.address.parameter('s').toString(), 3);
        same($.address.parameterNames(), ['p','s']);
        equals($.address.hash(), 'comment-2');
        start();
    }, 1000);
});

asyncTest("Hash test", function() {
    setTimeout(function() {
        $.address.value('/test');
        $.address.hash('comment-1');
        equals($.address.value(), '/test#comment-1');
        equals($.address.path(), '/test');
        equals($.address.hash(), 'comment-1');
        start();
    }, 1000);
});

setTimeout(function() {
    $.address.value('/');
}, 15000);