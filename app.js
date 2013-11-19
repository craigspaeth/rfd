var express = require('express'),
    fs = require('fs');

var port = process.env.PORT || 4000;

var app = express();
if ('development' == app.get('env')) {
  app.get('/', function(req, res, next) {
    var jade = require('jade'),
      filename = __dirname + '/src/index.jade';
    var html = jade.compile(fs.readFileSync(filename), { filename: filename })();
    fs.writeFileSync(__dirname + '/public/index.html', html);
    next();
  });
}
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + "/public/images/favicon.ico")); 
app.listen(port, function() {
  console.log('Listening on ' + port);
});