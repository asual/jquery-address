var fs = require('fs'),
    connect = require('connect'),
    express = require('express'),
    path = require('path'),
    sys = require('sys'),
    url = require('url'),
    data = JSON.parse(fs.readFileSync(__dirname + '/data.js', 'utf8')),
    app = express.createServer();
        
app.configure(function(){
    app.use(express.staticProvider(__dirname + '/public'));
});

app.register('.html', require('ejs'));

app.get('*', function(req, res) {

    var pathname = url.parse(req.url).pathname,
        pageNotFound = "Page not found.",
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
	} else {
	    res.render(path.dirname(__filename) + '/views/index.html', {
	        layout: false,
	        locals: {
	            data: data,
	            selected: selected
	        }
	    }, function(err, content) { 
	        res.send(content, selected.status);
	    });
	}

});

app.listen(3000);