var fs = require('fs'),
    connect = require('connect'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    data = JSON.parse(fs.readFileSync(__dirname + '/data.js', 'utf8')),
    app = express.createServer();
        
app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.register('.html', require('ejs'));

app.get('*', function(req, res) {

    var pathname = url.parse(req.url).pathname,
        pageNotFound = "Page not found.",
        state = '',
        selected = {
            title: pageNotFound, 
            content: pageNotFound, 
            status: 404 
        };
    
    for (var key in data) {
        if (data[key].href == pathname) {
        	status = 200;
            selected = data[key];
            break;
        }
    }
    
    if (req.isXMLHttpRequest && req.accepts('application/json')) {
	    res.send(selected, selected.status);
    // Experimental patch for IE
    // } else if (/MSIE\s(?!10)/i.test(req.headers['user-agent']) && pathname != '/') {
    //     res.writeHead(302, { 'Location': state + '/#' + pathname });
    //     res.end();
    } else {
	    res.render(path.dirname(__filename) + '/views/index.html', {
	        layout: false,
	        locals: {
	            data: data,
	            selected: selected,
	            state: state
	        }
	    }, function(err, content) { 
	        res.send(content, selected.status);
	    });
	}

});

app.listen(3000);
