asyncTest("Value test", function() {
    setTimeout(function() {
        $.address.value('/test');
        equal($.address.value(), '/test');
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/');
        deepEqual($.address.pathNames(), []);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/test/more/');
        deepEqual($.address.pathNames(), ['test', 'more']);
        start();
    }, 1000);
});

asyncTest("Path names test", function() {
    setTimeout(function() {
        $.address.value('/test');
        deepEqual($.address.pathNames(), ['test']);
        start();
    }, 1000);
});

asyncTest("Query test", function() {
    setTimeout(function() {
        $.address.queryString('p=0');
        equal($.address.value(), '/test?p=0');
        equal($.address.path(), '/test');
        equal($.address.queryString(), 'p=0');
        start();
    }, 1000);
});

asyncTest("Parameter test", function() {
    setTimeout(function() {
        $.address.parameter('p', 1);
        equal($.address.value(), '/test?p=1');
        equal($.address.queryString(), 'p=1');
        equal($.address.parameter('p'), '1');
        start();
    }, 1000);
});

asyncTest("Parameter test", function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.parameter('p', 2, true);
        equal($.address.value(), '/test?p=1&p=2');
        equal($.address.queryString(), 'p=1&p=2');
        deepEqual($.address.parameter('p'), ['1','2']);
        deepEqual($.address.parameterNames(), ['p']);
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
        equal($.address.value(), '/test?p=2&p=3&s=3');
        deepEqual($.address.parameter('p'), ['2','3']);
        equal($.address.parameter('s'), 3);
        deepEqual($.address.parameterNames(), ['p','s']);
        start();
    }, 1000);
});

asyncTest("Hash test with parameters", function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.queryString('p=2&p=3&s=3');
        $.address.hash('comment-2');
        equal($.address.value(), '/test?p=2&p=3&s=3#comment-2');
        equal($.address.path(), '/test');
        equal($.address.parameter('p').toString(), '2,3');
        equal($.address.parameter('s').toString(), 3);
        deepEqual($.address.parameterNames(), ['p','s']);
        equal($.address.hash(), 'comment-2');
        start();
    }, 1000);
});

asyncTest("Hash test", function() {
    setTimeout(function() {
        $.address.value('/test');
        $.address.hash('comment-1');
        equal($.address.value(), '/test#comment-1');
        equal($.address.path(), '/test');
        equal($.address.hash(), 'comment-1');
        start();
    }, 1000);
});

setTimeout(function() {
    $.address.value('/');
}, 10000);