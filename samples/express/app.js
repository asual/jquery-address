var fs = require('fs'),
    connect = require('connect'),
    express = require('express'),
    sys = require('sys'),
    data = JSON.parse(fs.readFileSync(__dirname + '/data.js', 'utf8')),
    app = express.createServer();
        
app.configure(function(){
    app.use(express.staticProvider(__dirname + '/public'));
});

app.register('.html', require('ejs'));

app.get('*', function(req, res) {

        var selected;
        
        for (var key in data) {
            if (req.url == data[key].href) {
                selected = data[key];
            }
        }
        
        res.render('index.html', {
            layout: false,
            locals: {
                data: data,
                selected: selected,
                state: '/'
            }
        });

});

app.listen(3000);