asyncTest("Value test", function() {
    setTimeout(function() {
        $.address.value('/test');
        equals($.address.value(), '/test');
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
        $.address.parameter('p', 2, true);
        equals($.address.value(), '/test?p=1&p=2');
        equals($.address.queryString(), 'p=1&p=2');
        equals($.address.parameter('p').toString(), '1,2');
        start();
    }, 1000);
});

asyncTest("Parameter test", function() {
    setTimeout(function() {
    	$.address.queryString('')
    		.parameter('p', 1, true)
	        .parameter('p', 2)
	        .parameter('p', 3, true)
	        .parameter('s', 1)
	        .parameter('s', 2, true)
	        .parameter('s', 3)
	        .parameter('t', 0)
	        .parameter('t', null);
        equals($.address.value(), '/test?p=2&p=3&s=3');
        equals($.address.parameter('p').toString(), '2,3');
        equals($.address.parameter('s').toString(), 3);
        equals($.address.parameterNames().toString(), 'p,s');
        start();
    }, 1000);
});

setTimeout(function() {
	$.address.value('/');
}, 10000);