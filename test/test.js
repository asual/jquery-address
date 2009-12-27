asyncTest("Basic value", function() {
    setTimeout(function(){
        $.address.value('/test');
        equals($.address.value(), '/test');
        start();
    }, 1000);
});

asyncTest("Query string", function() {
    setTimeout(function(){
        $.address.queryString('p=0');
        equals($.address.value(), '/test?p=0');
        equals($.address.path(), '/test');
        equals($.address.queryString(), 'p=0');
        start();
    }, 1000);
});

asyncTest("Parameters", function() {
    setTimeout(function(){
        $.address.parameter('p', 1);
        equals($.address.value(), '/test?p=1');
        equals($.address.queryString(), 'p=1');
        equals($.address.parameter('p'), '1');
        start();
    }, 1000);
});

asyncTest("Parameters", function() {
    setTimeout(function(){
        $.address.parameter('p', 2, true);
        equals($.address.value(), '/test?p=1&p=2');
        equals($.address.queryString(), 'p=1&p=2');
        equals($.address.parameter('p').toString(), '1,2');
        start();
    }, 1000);
});

asyncTest("Reset", function() {
    setTimeout(function(){
    	$.address.value('/');
        start();
    }, 1000);
});