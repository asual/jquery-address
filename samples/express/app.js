var fs = require('fs'),
    connect = require('connect'),
    express = require('express'),
    path = require('path'),    
    sys = require('sys'),
    data = JSON.parse(fs.readFileSync(__dirname + '/data.js', 'utf8')),
    app = express.createServer();
        
app.configure(function(){
    app.use(express.staticProvider(__dirname + '/public'));
});

app.register('.html', require('ejs'));

app.get('*', function(req, res) {

    var selected = '{"title": "Page not found.", "content": "Page not found." }',
    	state = '/';
    
    for (var key in data) {
        if (req.url == data[key].href) {
            selected = data[key];
            break;
        }
    }

	if (req.isXMLHttpRequest && req.accepts('application/json')) {
		res.send(selected);
	} else {
	    res.render(path.dirname(__filename) + '/views/index.html', {
	        layout: false,
	        locals: {
	            data: data,
	            selected: selected,
	            state: state
	        }
	    });
	}

});

app.listen(3000);