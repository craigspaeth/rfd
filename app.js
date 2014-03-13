var express = require('express'),
    fs = require('fs'),
    port = process.env.PORT || 4000,
    app = express();

app.set('views', __dirname + '/src');
app.set('view engine', 'jade');
app.get('/', function(req, res) {
  switch (req.subdomains[0]) {
    case 'video':
      res.render('video');
      break;
    case 'design':
      res.render('design');
      break;
    default:
      res.render('index');
  }
});
app.get('/design', function(req, res) {
  res.render('design');
});
app.get('/video', function(req, res) {
  res.render('video');
});
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + "/public/images/favicon.ico")); 
app.listen(port, function() {
  console.log('Listening on ' + port);
});