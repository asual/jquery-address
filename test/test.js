asyncTest('Value test', function() {
    setTimeout(function() {
        $.address.value('/test');
        equals($.address.value(), '/test');
        setTimeout(function() {
            window.history.back();
        }, 50);
        start();
    }, 100);
});

asyncTest('History test', function() {
    setTimeout(function() {
        equals($.address.value(), '/');
        setTimeout(function() {
            window.history.forward();
        }, 50);
        start();
    }, 100);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        equals($.address.value(), '/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 100);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/test/1/2/');
        same($.address.pathNames(), ['test', '1', '2']);
        start();
    }, 100);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/');
        same($.address.pathNames(), []);
        start();
    }, 100);
});

asyncTest('Path names test', function() {
    setTimeout(function() {
        $.address.value('/test');
        same($.address.pathNames(), ['test']);
        start();
    }, 100);
});

asyncTest('Query test', function() {
    setTimeout(function() {
        $.address.queryString('p=0');
        equals($.address.value(), '/test?p=0');
        equals($.address.path(), '/test');
        equals($.address.queryString(), 'p=0');
        start();
    }, 100);
});

asyncTest('Frames disabled test', function() {
    setTimeout(function() {
        $.address.parameter('p', 2);

        var $iframe = $('<iframe src="frame.html#/?p=1"></iframe>');

        window.iframe = function(val){
            equals(val, 1);

            delete window.iframe;

            window.history.back();

            start();

            $iframe.remove();
        }
        
        $.address.frames(false);

        $iframe.appendTo('body');
    }, 100);
});

asyncTest('Frames enabled test', function() {
    setTimeout(function() {
        $.address.parameter('p', 3);

        var $iframe = $('<iframe src="frame.html#/?p=1"></iframe>');

        window.iframe = function(val){
            equals(val, 3);

            delete window.iframe;

            window.history.back();

            start();

            $iframe.remove();
        }

        $.address.frames(true);

        $iframe.appendTo('body');
    }, 100);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.parameter('a', null);
        $.address.parameter('p', 1);
        equals($.address.value(), '/test?p=1');
        equals($.address.queryString(), 'p=1');
        equals($.address.parameter('p'), '1');
        start();
    }, 100);
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
    }, 100);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.path('/test');
        $.address.parameter('p', encodeURIComponent('Test & Test'));
        equals($.address.value(), '/test?p='+ encodeURIComponent('Test & Test'));
        same($.address.parameter('p'), encodeURIComponent('Test & Test'));
        start();
    }, 100);
});

asyncTest('Parameter test', function() {
    setTimeout(function() {
        $.address.autoUpdate(false)
            .queryString('')
            .parameter('p', 1, true)
            .parameter('p', 0)
            .parameter('p', 2, true)
            .parameter('s', 1)
            .parameter('s', 2, true)
            .parameter('s', 3)
            .parameter('t', 0)
            .parameter('t', null)
            .autoUpdate(true)
            .update();
        equals($.address.value(), '/test?p=0&p=2&s=3');
        same($.address.parameter('p'), ['0','2']);
        equals($.address.parameter('s'), 3);
        same($.address.parameterNames(), ['p','s']);
        start();
    }, 100);
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
    }, 100);
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
    }, 100);
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
    }, 100);
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
    }, 100);
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
    }, 100);
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
    }, 100);
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
    }, 100);
});

asyncTest('Hash test', function() {
    setTimeout(function() {
        $.address.value('/test');
        $.address.hash('comment-1');
        equals($.address.value(), '/test#comment-1');
        equals($.address.path(), '/test');
        equals($.address.hash(), 'comment-1');
        start();
    }, 100);
});

asyncTest('Character test', function() {
    setTimeout(function() {
        $.address.value(encodeURI('/børn?тест=символ'));
        equals($.address.path(), encodeURI('/børn'));
        equals($.address.parameter(encodeURIComponent('тест')), encodeURIComponent('символ'));
        start();
    }, 100);
});

asyncTest('Character test', function() {
    setTimeout(function() {
        $.address.value('/Test Encoding');
        equals($.address.value(), '/Test Encoding');
        start();
    }, 100);
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
    }, 100);
});

asyncTest('Single quote test', function() {
    setTimeout(function() {
        var externalChange = 0;
        var testFunction = function() {
            externalChange++;
            equals(externalChange, 0);
        };
        var ignore = false;
        $.address.value('/')
            .bind('externalChange', testFunction)
            .parameter('p', "Patrick's Test")
            .unbind('externalChange', testFunction);
        start();
    }, 100);
});

asyncTest('Value test', function() {
    setTimeout(function() {
        $.address.value(1);
        equals($.address.value(), '/1');
        start();
    }, 100);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.value('test');
        equals($.address.value(), '/test');
        start();
    }, 100);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.value('?p=1&p=2');
        equals($.address.value(), '/?p=1&p=2');
        equals($.address.path(), '/');
        equals($.address.queryString(), 'p=1&p=2');
        equals($.address.parameter('p').toString(), '1,2');
        start();
    }, 100);
});

asyncTest('Strict test', function() {
    setTimeout(function() {
        $.address.strict(false);
        $.address.value('test');
        equals($.address.value(), 'test');
        start();
    }, 100);
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
    }, 100);
});


asyncTest("Hash Change Event test", function() {
  setTimeout(function() {
    var hashChangeCount = 0
      , hashChangeFunc = function(e){
          hashChangeCount ++;
          equals(hashChangeCount, 1)

          e.preventDefault();
          start()
      }
    

    $.address.value('/')
      .change(hashChangeFunc)
      .hash('foobar')
      .unbind('change')
  
  }, 100)
})

asyncTest("Prevent Default Test", function(){
  setTimeout(function(){ // Afterwards
    
    // Previous test should have preventDefaulted
    equals($.address.hash(), '')
    start();
  }, 20)
})

asyncTest("Subsequent prevent default should work", function(){
  
  var hashChangeCount = 0
  
  setTimeout(function() {
     var hashChangeFunc = function(e){
         hashChangeCount ++;
         e.preventDefault();
      }

    $.address
      .change(hashChangeFunc)
      .value('?foobar')
  
  }, 50)
  
  setTimeout(function(){
    equals($.address.value(), '')
    equal( hashChangeCount, 1, "Change Happened")
    $.address.value('bar')
  }, 100)

  setTimeout(function(){
    equals($.address.value(), '')
    equal(hashChangeCount, 2);
    $.address.unbind('change')
      .value('?foo')
  }, 150)

  // Test unbind
  setTimeout(function(){
    equal($.address.value(), '?foo')
    equal(hashChangeCount, 2);
    $.address.value('/')
    start()
  }, 200)


})



asyncTest('ensure code in hash is not executed (see commit a9f95e5885a9e)', function(){
  setTimeout(function(){
    var called = 0
    
    //place a function in the global namespace, this one should get called by the injected code
    window.omg = function(){
          called++;
    };

    $.address.change(function(){  
      equal(called, 0);

      $.address.value('/');
      delete window.omg;

      start();
    });  
  
    //change the hash
    window.location.hash = "'-window.top.omg(1)-'";
  }, 100)


})

setTimeout(function() {
    $.address.value('/');
}, 30000);
